import { Injectable } from 'angular2/core';

@Injectable() 

export class EmployeeService {
    constructor() {}
    
    getEmployees() {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    firstName: 'David',
                    lastName: 'De Keersmaecker'
                },
                {
                    firstName: 'Annelien',
                    lastName: 'Kortleven'
                }
            ]);
        });
    }
}