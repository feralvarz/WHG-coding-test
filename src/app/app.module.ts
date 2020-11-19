import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TileComponent } from './components/tile/tile.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects';
import { appStateReducerMap, IAppState } from './store/state';

@NgModule({
    declarations: [AppComponent, NavigationComponent, TileComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot<IAppState>(appStateReducerMap),
        EffectsModule.forRoot(AppEffects)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
