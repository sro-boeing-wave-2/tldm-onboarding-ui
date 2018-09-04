import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';



import { NgModule } from '@angular/core';

@NgModule({
 imports: [MatButtonModule,MatFormFieldModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatGridListModule, MatMenuModule, MatListModule, MatInputModule, MatCardModule],
 exports: [MatButtonModule,MatFormFieldModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatGridListModule, MatMenuModule, MatListModule, MatInputModule, MatCardModule],
})
export class MaterialModule { }
