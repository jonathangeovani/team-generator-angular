import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onInput(name: string) {
    this.newMemberName = name;
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      return;
    }

    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  generateTeams() {
    this.teams = [];

    if (!this.numberOfTeams) {
      this.errorMessage = 'Please enter a number of teams!';
      return;
    } else if (this.numberOfTeams <= 0) {
      this.errorMessage = 'Number of teams need to be greater than zero!';
      return;
    } else if (this.numberOfTeams > this.members.length) {
      this.errorMessage = 'Cannot have more teams than members!';
      return;
    }

    this.errorMessage = '';
    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = '';
  }
}
