import { PagerService } from './../../services/pagerservice/PagerService';
import { Router } from '@angular/router';
import { UserList } from './../../models/user-list/UserList';
import { OnInit } from '@angular/core';
import { UserListService, userJson } from './../../services/user-list/UserListService';
import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component ({
    selector: "user-list",
    templateUrl: "userList.html",
    providers: [UserListService]
})

export class UserListComponent implements OnInit {

    constructor(private router: Router, private userListService: UserListService, private pagerService: PagerService){}
    
    example: UserList;
    private routerParam;
    allItems: any;
    pager: any = {};
    pagedItems: any[];

    dupa;
    dupa1;
    dupa2;
    x = 2;


    ngOnInit(){

        this.userListService.getUserDetail()
            .subscribe(
                res => {
                    console.log("dupsko: " + res)
                    this.dupa2 = res
                }
            );


        // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // console.log(arr)

        // const arra = this.userListService.getUserTest();
        // const fil = arra.filter(
        //     (num, index) => index < 4 && index > 1
        // )
        // const sub = fil.subscribe(
        //     r => console.log("czyzby: " + r)
        // )



        // this.userListService.getUserTest()
        // // .filter(
        // //     (num, index) => index < 40 && index > 0
        
        // // )
        // .subscribe(
        //     res => {
        //         console.log("dupa" + Object.keys(res).length)
        //         console.log("dupa le: " + res.length)
        //         this.dupa1 = res;
        //     }
            
        // )
        // console.log(this.dupa1)

        ///////////////

      this.userListService.getUserList("valid1")
      .subscribe(
            res => {
            this.example = res;
            this.allItems = this.example.mandatory;
            this.setPage(1);
        }
      )

      console.log(this.allItems.length)

    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        this.pager = this.pagerService.getPager(this.allItems.length, page); 
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    /////////

    userDetail(example){
        this.routerParam = this.router.navigate(['user', example.id]);
    }

}








// export class UserListComponent implements OnInit {

//     constructor(private router: Router, private userListService: UserListService, private pagerService: PagerService){}
    
//     example: UserList;
//     private routerParam;
//     public allItems: any;
//     pager: any = {};
//     pagedItems: any[];

//     ngOnInit(){
//       this.userListService.getUserList("valid1").subscribe(
//             res => {
//             this.example = res;
//             this.allItems = this.example.mandatory;
//             this.setPage(1);
//         }
//       )
//     }

//     setPage(page: number) {
//         if (page < 1 || page > this.pager.totalPages) {
//             return;
//         }
 
//         this.pager = this.pagerService.getPager(this.allItems.length, page); 
//         this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
//     }

//     userDetail(example){
//         this.routerParam = this.router.navigate(['user', example.id]);
//     }

// }