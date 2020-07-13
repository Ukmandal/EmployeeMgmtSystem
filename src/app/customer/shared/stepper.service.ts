import { Injectable, ViewChild } from "@angular/core";
import { IAdmins } from "./interface";
import { ADMIN_DB } from "./mock-list";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatPaginator, MatSort, MatDialogRef, Sort } from "@angular/material";
import { Subject } from "rxjs/Subject";
import { AuthService } from "./auth.service";
import { map, filter } from "rxjs/operators";
import 'rxjs/add/observable/range';
import { SelectionModel } from "@angular/cdk/collections";
import { ConfirmationEdit } from "../customer-list/confirmation/confirmation-edit.component";

@Injectable()
export class AdminService {

    adminData: IAdmins;

    // get database to component
    getAdmins(): Observable<IAdmins[]> {
        // if (!this.auth.getCurrentUser)
        //     return Observable.of(ADMIN_DB);

        // let allElements = ADMIN_DB.find(x => x.role === this.auth.getCurrentUser.role);
        // let element = ADMIN_DB.filter(x => x.role == 'user' || x.role === 'manager');
        // let user = ADMIN_DB.filter(x => x.role === 'user');

        // // validate current user role and return data
        // if (allElements.role === 'admin')
        //     return Observable.of(ADMIN_DB);
        // else if (allElements.role === 'manager') {
        //     return Observable.of(element);
        // }
        // else {
        //     return Observable.of(user);
        // }
        return Observable.of(ADMIN_DB.slice(0, 4));
    }

    //get single data from database to component
    getAdmin(id: number): Observable<IAdmins> {
        return Observable.of(ADMIN_DB.find(x => x.id === id));

    }

    //add new admin in form and save
    addAdmin(body: any) {
        let max = Math.max(...ADMIN_DB.map(x => x.id));
        body.id = max + 1;
        ADMIN_DB.push(body);
        return body;
    }

    deleteMultiple() {
        let data = ADMIN_DB;
        Observable.range(0, this.selected.length)
            .pipe(
                map(delIndex => data.findIndex(x => x.id === this.selected[delIndex])),
                filter(index => index > -1)
            )
            .subscribe(index => {
                data.splice(index, 1);
            });
    }

    // addOrUpdateContacts(body: Icontact) {
    //     // this.adminData = this.addAdmin(body);
    //     const index = ADMIN_DB.findIndex(x => x.id === body.employeeId)
    //     if (!(index > -1)) return false;

    //     const parent = ADMIN_DB[index];

    //     if (parent && parent.contact) {

    //         parent.contact.push(body);
    //     } else {
    //         parent.contact = [];
    //         parent.contact.push(body);
    //     }
    //     return true;
    // }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    selected: number[];
    ADMIN_DB: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        role: string;
        color: string[];
        status: number;
        Country: string;
    }[];

    dialogRef: MatDialogRef<ConfirmationEdit>;
    private subject = new Subject<IAdmins[]>();
    constructor(private auth: AuthService) { }

    getEmployees(): Observable<IAdmins[]> {

        // if (!this.auth.getCurrentUser)
        //     return Observable.of(ADMIN_DB);

        // let allElements = ADMIN_DB.find(x => x.role === this.auth.getCurrentUser.role);
        // let element = ADMIN_DB.filter(x => x.role == 'user' || x.role === 'manager');
        // let user = ADMIN_DB.filter(x => x.role === 'user');

        // // validate current user role and return data
        // if (allElements.role === 'admin')
        //     return Observable.of(ADMIN_DB);
        // else if (allElements.role === 'manager') {
        //     return Observable.of(element);
        // }
        // else {
        //     return Observable.of(user);
        // }

        return Observable.of(ADMIN_DB.slice(0, 4));
    }

    getEmployee(id: number): Observable<IAdmins> {
        return Observable.of(ADMIN_DB.find(x => x.id === id));
    }

    onDeleteClick(id: number): Observable<IAdmins[]> {
        let data = ADMIN_DB;
        let index = data.findIndex(x => x.id === id);

        if (index > -1) {
            data.splice(index, 1);
        }
        return Observable.of(data);
    }

    onEditClick(body: any): Observable<IAdmins[]> {
        let index = ADMIN_DB.findIndex(x => x.id === body.id);

        if (index > -1) {
            ADMIN_DB[index] = body;
            this.ADMIN_DB = this.ADMIN_DB;
            return Observable.of(ADMIN_DB);
        } {
            let max = Math.max(...this.ADMIN_DB.map(x => x.id));
            body.id = max + 1;
            ADMIN_DB.push(body);
            this.ADMIN_DB = this.ADMIN_DB;
            return Observable.of(ADMIN_DB);
        }
    }

    register(user: any) {
        let max = Math.max(...ADMIN_DB.map(x => x.id));
        user.id = max + 1;
        ADMIN_DB.push(user);
        return ADMIN_DB;
    }

    // getFiltered(x: string) {
    //     let d = ADMIN_DB.filter(y => y.id.toString().indexOf(x) > -1 ||
    //         y.role.toString().indexOf(x) > -1);
    //     return d.length > 0 ? d : ADMIN_DB;
    // }

    sortData(sort: Sort, start: number, end: number, filtered?: string): Observable<IAdmins[]> {
        let getFiltered = filtered ? ADMIN_DB.filter(x => x.email.toLowerCase()
            .includes(filtered.toLocaleLowerCase())) : ADMIN_DB;
        if (!sort.active)
            return Observable.of(getFiltered.slice(start, end));

        getFiltered.sort((a, b) => {
            if (sort.direction === '') {
                return compare(a.id, b.id, true);
            }

            let isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id': return compare(a.id, b.id, isAsc);
                case 'firstName': return compare(a.firstName, b.firstName, isAsc);
                case 'lastName': return compare(a.lastName, b.lastName, isAsc);
            }
        });
        return Observable.of(getFiltered.slice(start, end));
    }
    Country() {
        return COUNTRY;
    }
    color() {
        return COLOR;
    }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

let COUNTRY = [
    { name: 'Nepal', id: 'A' },
    { name: 'China', id: 'B' },
    { name: 'Bangladesh', id: 'C' },
    { name: 'France', id: 'D' },
    { name: 'USA', id: 'E' },
    { name: 'Italy', id: 'F' },
    { name: 'Germany', id: 'L' },
    { name: 'UK', id: 'M' },
    { name: 'Russia', id: 'N' },
    { name: 'Canada', id: 'O' },
    { name: 'India', id: 'P' },
    { name: 'Bhutan', id: 'Q' },
    { name: 'Finland', id: 'R' },
    { name: 'Iceland', id: 'S' },
    { name: 'Kuwait', id: 'T' },
    { name: 'South Korea', id: 'U' },
    { name: 'Japan', id: 'V' },
    { name: 'Afghanistan', id: 'W' },
    { name: 'Pakistan', id: 'X' },
    { name: 'Maldives', id: 'Y' },
    { name: 'Malaysia', id: 'Z' },
    { name: 'UAE', id: 'AA' },
    { name: 'Qatar', id: 'AB' },
    { name: 'Somalia', id: 'AC' },
    { name: 'North Korea', id: 'AD' },
];

let COLOR = [
    { name: 'red', id: 'A' },
    { name: 'Green', id: 'B' },
    { name: 'Blue', id: 'C' },
    { name: 'Yellow', id: 'D' },
    { name: 'White', id: 'E' },
    { name: 'Black', id: 'F' },
    { name: 'Pink', id: 'G' },
    { name: 'Purple', id: 'H' },
];