import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { InfoService } from 'src/app/services/info.service';
import { JwtService } from 'src/app/services/jwt.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chart: any = null;
  totalMeetings: number = 0;
  totalAllRegistersMeeting: number = 0;
  userData: AuthUser = {} as AuthUser


  @ViewChild('chart') canvas: ElementRef = {} as ElementRef;

  constructor(
    private infoService: InfoService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.userData = this.jwtService.getData()
    this.infoService.getAllRegistersByOrganizer().subscribe({
      next: (response) => {
        this.totalAllRegistersMeeting = response.data.total
      }
    })
    this.infoService.getTotalMeetingsByUser().subscribe({
      next: (response) => {
        this.totalMeetings = response.data.total

      }
    })
    this.infoService.getRegistersForMeetingsByUser().subscribe({
      next: (response) => {
        this.drawChart(response.data.map(d => d.name), response.data.map(d => d.registers),)
      }
    })
  }

  drawChart(labels: Array<String>, datavalues: Array<Number>) {
    const canvasMeeting = this.canvas.nativeElement;
    this.chart = new Chart(canvasMeeting, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Usuarios registrados',
          data: datavalues,
          backgroundColor: [
            'rgba(83,59,255,0.2)',
            'rgba(43,0,255,0.2)',
            'rgba(32,3,175,0.2)',
            'rgba(15,0,119,0.2)'
          ],
          borderColor: [
            'rgba(83,59,255,1)',
            'rgba(43,0,255,1)',
            'rgba(32,3,175,1)',
            'rgba(15,0,119,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
              font: {
                size: 13
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            font: {
              size: 22
            }
          },
          tooltip: {
            padding: 20,

            bodyFont: {
              size: 14
            },
            titleFont: {
              size: 16
            }
          },
          legend: {
            labels: {
              font: {
                size: 0
              }
            }
          }
        },

      }
    });
  }
}

