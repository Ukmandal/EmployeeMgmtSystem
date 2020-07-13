import { Component, Input } from "@angular/core";
import { IAdmins } from "../../shared/interface";
import { AdminService } from "../../shared/stepper.service";



@Component({
  templateUrl: 'expansion.component.html',
})
export class ExpansionComponent {
  @Input() childData: IAdmins;

  constructor(private employeeService: AdminService) { }
}
