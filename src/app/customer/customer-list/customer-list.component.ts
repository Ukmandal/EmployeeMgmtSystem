import {
    Component, OnInit, ComponentFactoryResolver, ViewChildren,
    ViewContainerRef, QueryList, AfterViewInit, ViewChild, ComponentFactory
} from '@angular/core';
import {
    MatDialog, MatSnackBar, Sort, MatSort, MatPaginator, MatCheckboxChange,
    MatTableDataSource
} from '@angular/material';

import { FormGroup } from '@angular/forms';
import { ConfirmationDelete } from './confirmation/confirmation-delete.component';
import { ConfirmationEdit } from './confirmation/confirmation-edit.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';

import { SelectionModel } from '@angular/cdk/collections';
import { filter, map, delay, delayWhen, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExpansionComponent } from './expand/expansion.component';
import { merge } from 'rxjs/observable/merge';
import { ADMIN_DB } from '../shared/mock-list';
import { IAdmins } from '../shared/interface';
import { AdminService } from '../shared/stepper.service';

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.component.html',
    styles: [`
    a {
        cursor: pointer;
    }
`]

})
export class CustomerListComponent implements OnInit, AfterViewInit {

    displayedColumns = ['details', 'id', 'firstName', 'lastName', 'color', 'status', 'checkbox', 'edit', 'delete'];

    expandedRow: number;
    isAllChecked: boolean = false;
    selected: number[] = [];
    customerForm: FormGroup;
    employees = ADMIN_DB.slice(0, 4);
    length = ADMIN_DB.length;
    pageSize = 4;
    pageSizeOptions = [2, 4, 6, 8, 10, 20, 30, 40, 50];
    dataSource = new MatTableDataSource<IAdmins>([]);
    selection = new SelectionModel<number>(true, []);

    @ViewChildren('cdkrow', { read: ViewContainerRef })
    private containers: QueryList<ViewContainerRef>

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public employeeService: AdminService,
        private resolver: ComponentFactoryResolver,
    ) {}

    ngOnInit() {
        this.employeeService.getAdmins()
            .subscribe(d => {
                this.dataSource.data = d;
                this.dataSource._updateChangeSubscription();
            });
    }

    ngAfterViewInit() {
        let obs = [this.sort.sortChange, this.paginator.page];
        merge(...obs)
            .pipe(
                flatMap(obj => this.employeeService.sortData(<Sort>obj, this.start, this.end))
            ).subscribe(d => {
                this.dataSource.data = d;
            }
            );
    }

    get start() {
        return this.paginator.pageIndex * this.paginator.pageSize;
    }
    get end() {
        return (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    }

    //openConfirmationDelete-part1
    openConfirmationDelete(id: number) {
        let dialogRef = this.dialog.open(ConfirmationDelete, {
            disableClose: true,
            width: '400px',
            height: '200px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.employeeService.onDeleteClick(id).subscribe(() => {
                    let data = this.dataSource.data;
                    let index = this.employees.findIndex(x => x.id === id);
                    if (index > -1) {
                        data.splice(index, 1);
                        this.dataSource._updateChangeSubscription();
                    }
                })

                let snackBarRef = this.snackBar.open('Message Deleted Successfully!',
                    'Got it!', {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
            };
        });


    }

    //openConfirmationEdit and add-part2
    openConfirmationEdit(id: number) {

        let employees = this.dataSource.data;
        let item = this.employees.find(x => x.id === id);

        let dialogRef = this.dialog.open(ConfirmationEdit, {
            disableClose: true,
            height: (window.innerHeight - 100) + 'px',
            width: (window.innerWidth - 200) + 'px',
            autoFocus: false,
            data: item ? item : {},
        });

        dialogRef.afterClosed().subscribe(() => {

            let body: IAdmins = dialogRef.componentInstance.employeesEdit;
            if (!body) return;

            this.employeeService.onEditClick(body)
                .subscribe(res => {
                    let index = employees.findIndex(x => x.id === id);
                    if (index > -1) {
                        employees[index] = body;
                    } else {
                        this.employees.push();
                        console.log('edited successfully!');
                    }
                    this.dataSource._updateChangeSubscription();
                    let snackBarRef = this.snackBar.open('Message Saved Successfully!',
                        'Got it!', {
                            duration: 2000,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                        });
                });
        });
    }

    onRowSelected(c: MatCheckboxChange, id: number) {
        let exist = this.selected.findIndex(x => x === id);
        if (c.checked && !(exist > -1)) {
            this.selected.push(id);
        }
        else {
            this.selected.splice(exist, 1);
        }
        console.log(this.selected);
    }

    deleteMultiple() {
        let dialogRef = this.dialog.open(ConfirmationDelete, {
            disableClose: true,
            width: '400px',
            height: '200px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                let data = this.dataSource.data;
                let selected = this.selection.selected;
                Observable.range(0, selected.length)
                    .pipe(
                        map(delIndex => data.findIndex(x => x.id === selected[delIndex])),
                        filter(index => index > -1)
                    )
                    .subscribe(index => {
                        data.splice(index, 1);
                        this.selection.clear();
                        this.dataSource._updateChangeSubscription();
                    });
                let snackBarRef = this.snackBar.open('Message Deleted Successfully!',
                    'Got it!', {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
            }
            this.employeeService.deleteMultiple();
        });
    }

    toggleCheckAll(c: MatCheckboxChange) {
        this.isAllChecked = true;
        this.isAllChecked = c.checked;
        this.selected = c.checked ?
            this.employees.map(x => x.id) : [];
        console.log(this.selected);
    }

    expandRow(index: number) {
        if (this.expandedRow != null) {
            this.containers.toArray()[this.expandedRow].clear();
        }
        if (this.expandedRow === index) {
            this.expandedRow = null;
        } else {
            const container = this.containers.toArray()[index];
            const factory: ComponentFactory<ExpansionComponent> =
                this.resolver.resolveComponentFactory(ExpansionComponent);
            const messageComponent = container.createComponent(factory);
            messageComponent.instance.childData = this.dataSource.data[index];
            this.expandedRow = index;
        }
    }

    // Select For Status Change
    select(status: number) {
        let src = this.selection.selected;
        let target = this.dataSource.data;
        Observable.range(0, src.length)
            .pipe(
                delayWhen(num => of(num).pipe(delay(500 * num + 1))),
                map(counter => {
                    let id = src[counter];
                    if (id > 0) {
                        let trgIndex = target.findIndex(x => x.id === id);
                        if (trgIndex > -1) {
                            target[trgIndex].status = status;
                            this.dataSource._updateChangeSubscription();
                            return document.getElementById('state-' + id);
                        }
                    }
                })
            )
    }

    // Selecting list on table
    isAllSelected() {
        return this.selection.selected.length === this.dataSource.data.length;
    }

    // On DisplayColumns checkBox
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row.id));
    }
}