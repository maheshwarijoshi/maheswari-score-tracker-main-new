import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectedTeamInfo, Team } from '../../models/score-tracker';
import { AppConstants } from '../../constants/app-constants';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css'],
})
export class TeamResultsComponent implements OnInit {
  hasLoading: boolean = false;
  selectedTeamInfo: SelectedTeamInfo;
  selectedTeam: Team;
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.hasLoading = true;
    const allTeamsInfo: SelectedTeamInfo[] =
      JSON.parse(localStorage.getItem(AppConstants.SCORE_TRACKER_DATA)!) || [];
    this.getTeamInfo(allTeamsInfo);
  }

  getTeamInfo(allTeamsInfo: SelectedTeamInfo[]): void {
    const { params } = this.activatedRoute.snapshot;
    const team_abbreviation: string = Object.values(params)[0];
    this.selectedTeamInfo =
      allTeamsInfo &&
      allTeamsInfo.find(
        (team: SelectedTeamInfo) => team.team_abbreviation === team_abbreviation
      );
    this.hasLoading = false;
  }
}
