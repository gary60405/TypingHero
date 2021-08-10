import { AnimalService } from './share/animal.service';
import { MusicService } from './share/music.service';
import { ShareService } from './share/share.service';
import { StageComponent } from './stage/stage.component';
import { StageService } from './stage/stage.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatetimeService } from './share/datetime.service';
import { Routes,  RouterModule } from '@angular/router';

export const firebaseConfig = {
  apiKey: 'AIzaSyD-xG9a85R_NdQlP0sAw8Tp6PMWAEqAw38',
  authDomain: 'typinghero-1c004.firebaseapp.com',
  databaseURL: 'https://typinghero-1c004.firebaseio.com',
  projectId: 'typinghero-1c004',
  storageBucket: 'typinghero-1c004.appspot.com',
  messagingSenderId: '990600809976'
};

export const appRoutes: Routes = [
  {path: '', component: StageComponent},
  {path: 'scoreBoard', component: ScoreBoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StageComponent,
    ScoreBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StageService,
    ShareService,
    DatetimeService,
    MusicService,
    AnimalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
