import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-general',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule' },
  { path: 'plot', loadChildren: './plot/plot.module#PlotPageModule' },
  { path: 'detail-tree', loadChildren: './detail-tree/detail-tree.module#DetailTreePageModule' },
  { path: 'new-zone', loadChildren: './new-zone/new-zone.module#NewZonePageModule' },
  { path: 'new-project', loadChildren: './new-project/new-project.module#NewProjectPageModule' },
  { path: 'new-plot', loadChildren: './new-plot/new-plot.module#NewPlotPageModule' },
  { path: 'new-habitat', loadChildren: './new-habitat/new-habitat.module#NewHabitatPageModule' },
  { path: 'new-individual', loadChildren: './new-individual/new-individual.module#NewIndividualPageModule' },
  { path: 'individuals', loadChildren: './individuals/individuals.module#IndividualsPageModule' },
  { path: 'home-general', loadChildren: './home-general/home-general.module#HomeGeneralPageModule' },
  { path: 'config-user', loadChildren: './config-user/config-user.module#ConfigUserPageModule' },
  { path: 'config-customer', loadChildren: './config-customer/config-customer.module#ConfigCustomerPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
