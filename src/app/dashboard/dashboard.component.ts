import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';


interface SoftwareItem {
  id: number;
  appName: string;
  version: string;
  status: string;
  openIssues: number;
  resolvedTickets: number;
  createdAt?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: SoftwareItem[] = [];

  newApp: Partial<SoftwareItem> = {
    appName: '',
    version: '',
    status: 'Running',
    openIssues: 0,
    resolvedTickets: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<SoftwareItem[]>('http://localhost:3000/dashboard')
      .subscribe({
        next: data => {
          this.dashboard = data;
        },
        error: err => console.error('Error loading dashboard:', err)
      });
  }

  addSoftware() {
    if (!this.newApp.appName || !this.newApp.version) {
      alert('Please provide software name and version!');
      return;
    }

    this.http.post('http://localhost:3000/dashboard', this.newApp)
      .subscribe({
        next: (res: any) => {
          alert('Software added ✅');
          this.newApp = { appName: '', version: '', status: 'Running', openIssues: 0, resolvedTickets: 0 };
          this.loadData();
        },
        error: err => {
          console.error('Error adding software:', err);
          alert('❌ Failed to add software');
        }
      });
  }

  deleteSoftware(id: number) {
    if (!confirm('Are you sure you want to delete this software?')) return;

    this.http.delete(`http://localhost:3000/dashboard/${id}`)
      .subscribe({
        next: () => {
          alert('Software deleted 🗑️');
          this.loadData();
        },
        error: err => {
          console.error('Error deleting software:', err);
          alert('❌ Failed to delete software');
        }
      });
  }

}
