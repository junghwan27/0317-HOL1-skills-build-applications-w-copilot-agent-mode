from django.test import TestCase
from rest_framework.test import APIClient

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class OctofitCollectionsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.marvel = Team.objects.create(name="Marvel Team", universe="marvel")
        self.iron_man = UserProfile.objects.create(
            name="Iron Man", email="ironman-test@octofit.dev", team=self.marvel
        )
        Activity.objects.create(
            user=self.iron_man,
            activity_type="Arc Reactor HIIT",
            duration_minutes=45,
            calories_burned=520,
        )
        LeaderboardEntry.objects.create(user=self.iron_man, points=900, rank=1)
        Workout.objects.create(
            user=self.iron_man,
            title="Repulsor Core Workout",
            difficulty="hard",
            duration_minutes=35,
        )

    def test_api_root_contains_all_collection_urls(self):
        response = self.client.get("/api/")
        self.assertEqual(response.status_code, 200)

        body = response.json()
        self.assertIn("users", body)
        self.assertIn("teams", body)
        self.assertIn("activities", body)
        self.assertIn("leaderboard", body)
        self.assertIn("workouts", body)

    def test_collections_list_endpoints_return_data(self):
        endpoint_to_expected_count = {
            "/api/users/": 1,
            "/api/teams/": 1,
            "/api/activities/": 1,
            "/api/leaderboard/": 1,
            "/api/workouts/": 1,
        }

        for endpoint, expected_count in endpoint_to_expected_count.items():
            response = self.client.get(endpoint)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json()), expected_count)
