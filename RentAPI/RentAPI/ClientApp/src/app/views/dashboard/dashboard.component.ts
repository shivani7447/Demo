import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from '../../services/repository.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public userId = 0;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
  ) 
  { }
  
  

 
  
  
  
  
 
 
  

  // mainChart

  public mainChartData1: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Pending'
    } 
     
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
         // maxTicksLimit: 5,
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--danger'), 10),
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

   
   // barChart
   public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [];

  
// Pie
public pieChartLabels: string[] = [];
public pieChartData: number[] = [];
public pieChartType = 'pie';

   

  ngOnInit(): void {

     // logged in user
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     this.userId=currentUser.userId;

     this.PendingPayment();

     this.Refresh();
    
//bar
    this.barChartLabels= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData= [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Tenant'}
    ];
     
    this.pieChartLabels= ['Tolet Room', 'Booked Room'];
    this.pieChartData= [0, 0];


  }
  public Refresh() {
    this.loading = true;
    let apiUrl: string = `dashboard/${this.userId}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        if (res.status) {
        this.loading = false;
      }else{
        this.loading = false;
      }
      },
      (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
      })
      )
    }

    public PendingPayment() {
      this.loading = true;
      let apiUrl: string = `dashboard/pendingPaymentChart/${this.userId}`;
  
      this.repository.getData(apiUrl)
        .subscribe(res => {
          if (res.status) {
          this.loading = false;
 
   for (let i = 0; i <= res.data.price.length; i++) {
     this.mainChartData1.push(res.data.price[i]);
    }
this.mainChartLabels=res.data.month;
         
//pie
 
this.pieChartData= res.data.pieWeb;
console.log(res.data.pieWeb);
//bar
this.barChartLabels= res.data.barMonth;
    this.barChartData= [
      {data: res.data.bar, label: 'Tenant'}
    ];


        }else{
          this.loading = false;
        }
        },
        (error => {
          this.loading = false;
          this.errorHandler.handleError(error);
        })
        )
      }
}
