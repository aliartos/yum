/*
 * Copyright (C) 2017 JR Technologies.
 * This file is part of Yum.
 * 
 * Yum is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * Yum is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Yum. 
 * If not, see <http://www.gnu.org/licenses/>.
 */
package com.jrtechnologies.tasks;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern; 
import com.jrtechnologies.yum.data.entity.Settings;
import com.jrtechnologies.yum.data.repository.DailyMenuRepository;
import com.jrtechnologies.yum.data.repository.HolidaysRepository;
import com.jrtechnologies.yum.data.repository.SettingsRepository; 
import com.jrtechnologies.yum.service.EmailService;
import com.jrtechnologies.yum.service.MenusService;
import org.joda.time.Days;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.LocalTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

 
@Component
public class ReportEmail implements ApplicationListener<ApplicationReadyEvent> {
   
    @Autowired
    private EmailService eService;
    
    @Autowired
    SettingsRepository settingsRepo;
    
    @Autowired
    ScheduledTasks scheduledTask;
    
    @Autowired
    HolidaysRepository holidaysRepo;

    @Autowired
    DailyMenuRepository dailyMenuRepo;
    
    @Autowired
    MenusService menusService;
    
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    
    
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {

      this.registerSchedule();

      return;
    }
    
    private void sendAutoOrderSummary(){
        
        System.out.println("RUN TASK SCHEDULE: " + LocalDateTime.now());
        
        //Get deadline days
        Settings settings = settingsRepo.findById(1);
        
        int deadlinedays = settings.getDeadlineDays();
        LocalDate day = new LocalDate();
        
        if(this.holidaysRepo.findByIdHoliday(day) != null){
            return;
        }
                 
        LocalDate initDate = (day).plusDays(deadlinedays);
//        while (this.holidaysRepo.findByIdHoliday(initDate) != null) {
//            initDate = initDate.plusDays(1);
//        }
        
        LocalDate maxCheckdate = (initDate).plusDays(deadlinedays);
        while (this.holidaysRepo.findByIdHoliday(maxCheckdate) != null) {
            maxCheckdate = maxCheckdate.plusDays(1);
        }

        int checkDays = Days.daysBetween((new LocalDate()), maxCheckdate).getDays() + deadlinedays;
        
        for (int i = 0; i <= checkDays; i++) { //newDeadlineDays
            LocalDate dailyMenuDate = initDate.plusDays(i);
            // if old deadline not passed and new deadline passed and dailyMenu not null, send report email
            if (menusService.deadlinePassed(dailyMenuDate) && dailyMenuRepo.findByDate(dailyMenuDate) != null) { //
                //System.out.println(">>>>>>>>>>>>>sending email, date: " + dailyMenuDate); 
                eService.sendOrderSummary(dailyMenuDate);
            }
        }

    }
    

 
    
    
   // @PostConstruct
    public void registerSchedule(){
        
        //Use to immediately send summary report:
        //sendAutoOrderSummary( );
        
        Settings settings = settingsRepo.findById(1);
        LocalTime lt = settings.getDeadline();
        String cronTime = "0 "+String.valueOf(lt.getMinuteOfHour())+" "+String.valueOf(lt.getHourOfDay())+" 1/1 * ?";
        System.out.println("Cron:" + cronTime);
         
        Runnable task = new Runnable() {
            @Override
            public void run() {
                sendAutoOrderSummary( );
            }
        };        
         
        Trigger trigger = new Trigger() {
            @Override
            public Date nextExecutionTime(TriggerContext triggerContext) {
                String cron = cronTime;
                log.info(cron);
                CronTrigger trigger = new CronTrigger(cron);
                Date nextExec = trigger.nextExecutionTime(triggerContext);
                return nextExec;
            } 
        };
        
        
        scheduledTask.setScheduledTask(task, trigger);
        
    }
    
    public LocalDate getDate(String date) {
        LocalDate dt = null;
        //Decode & Validate date 
        String patternString = "^(\\d{4})-(\\d{2})-(\\d{2})$";
        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(date);

        if (!matcher.matches()) {
            log.error(EmailService.class.getName() + "wrong date format:" + date);
            return null;
        } 

        try {
            dt = new LocalDate(date);
        } catch (Exception e) {
            log.error(EmailService.class.getName() + "wrong date format:" + date);
        }
        
        return dt;
    }
}
