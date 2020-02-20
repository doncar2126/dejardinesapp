import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-habitat',
  templateUrl: './new-habitat.page.html',
  styleUrls: ['./new-habitat.page.scss'],
})
export class NewHabitatPage implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  cancelCreationHabitat() {
    this.router.navigate(["/plot"]);
  }

}
