import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GetPersonsService } from './service/get-persons.service';
import { Demographics, PersonDetails } from './Model/Person';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    
  ],
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'AdventureWorks';

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private _person:GetPersonsService,private dialog:MatDialog){}
  
  displayedColumns: string[] = ['FirstName', 'LastName', 'EmailAddress', 'PhoneNumber','Address','Demographic'];
  dataSource:any;
  personDetails:Array<PersonDetails>=[];
  demographicDetails!:Demographics;
  selectedPerson!:string;
  recordsPerPage:number=1;
  pageIndex:number=1;
  recordsLength:number=0;

  ngOnInit(): void {
    this.getPersons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getPersons(){
    this._person.getPersonDetails(this.pageIndex,this.recordsPerPage).subscribe({
      next:data=>{
        console.log(data);
        this.personDetails=data;
        this.dataSource = new MatTableDataSource(this.personDetails);
        this.recordsLength=this.personDetails[0].totalRecords;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  openDialog(element:PersonDetails,dialog:TemplateRef<any>){
    this.dialog.open(dialog,{disableClose:true});
    this.selectedPerson= element.firstName;
    this.demographicDetails=element.demographics[0];
    console.log(this.demographicDetails);
  }

  onPaginationChange(event:any){
    this.pageIndex =event.pageIndex+1; 
    this.getPersons();
  }
}
