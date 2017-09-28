import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdGridListModule, MdSelectModule, MdButtonModule, MdInputModule, MdCardModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
//import { RouterModule } from '@angular/router';
import { SettingsComponent }   from './settings.component';
import { SettingsRouteGuard } from './settings-route.guard';
import { routing } from './settings.routing';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { ProfileModule } from '../profile/profile.module';
import { BalanceModule } from '../../shared/balance/balance.module'
//import { AuthenticationService } from '../authentication.service';

@NgModule({
  imports: [CommonModule, routing, HeaderModule, FooterModule, MdGridListModule, MdSelectModule, FormsModule, ReactiveFormsModule, ProfileModule, MdButtonModule, MdInputModule, MdCardModule, BalanceModule ],
  declarations: [SettingsComponent],
  providers:  [ SettingsRouteGuard],
  exports: [MdButtonModule, MdInputModule]
})
export class SettingsModule {}
