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
package com.jrtechnologies.aspects;

import com.jrtechnologies.YumWebSocketHandler;
import java.math.BigDecimal;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component 
public class BalanceChangedAspect {
        
    @Autowired
    private YumWebSocketHandler webSocketHandler;
    
    @Around("@annotation(com.jrtechnologies.aspects.BalanceChanged) && execution(public * *(..))")
    public Object time(final ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        Object value;
        
        Object[] args = proceedingJoinPoint.getArgs();
        
        try {
            value = proceedingJoinPoint.proceed();
        } catch (Throwable throwable) {
            throw throwable;
        } finally {
            webSocketHandler.sendBalanceToUser((long) args[0], (BigDecimal) args[2]);
            
        }

        return value;
    }
}