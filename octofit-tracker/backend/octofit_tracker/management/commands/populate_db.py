from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = "octofit_db 데이터베이스에 테스트 데이터를 입력합니다."

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        marvel = Team.objects.create(name="Marvel Team", universe="marvel")
        dc = Team.objects.create(name="DC Team", universe="dc")

        users = {
            "Iron Man": UserProfile.objects.create(
                name="Iron Man", email="ironman@octofit.dev", team=marvel
            ),
            "Spider-Man": UserProfile.objects.create(
                name="Spider-Man", email="spiderman@octofit.dev", team=marvel
            ),
            "Wonder Woman": UserProfile.objects.create(
                name="Wonder Woman", email="wonderwoman@octofit.dev", team=dc
            ),
            "Batman": UserProfile.objects.create(
                name="Batman", email="batman@octofit.dev", team=dc
            ),
        }

        Activity.objects.bulk_create(
            [
                Activity(
                    user=users["Iron Man"],
                    activity_type="Arc Reactor HIIT",
                    duration_minutes=45,
                    calories_burned=520,
                ),
                Activity(
                    user=users["Spider-Man"],
                    activity_type="Web Swing Cardio",
                    duration_minutes=40,
                    calories_burned=460,
                ),
                Activity(
                    user=users["Wonder Woman"],
                    activity_type="Amazon Strength",
                    duration_minutes=50,
                    calories_burned=610,
                ),
                Activity(
                    user=users["Batman"],
                    activity_type="Gotham Night Run",
                    duration_minutes=38,
                    calories_burned=430,
                ),
            ]
        )

        LeaderboardEntry.objects.bulk_create(
            [
                LeaderboardEntry(user=users["Wonder Woman"], points=980, rank=1),
                LeaderboardEntry(user=users["Iron Man"], points=910, rank=2),
                LeaderboardEntry(user=users["Spider-Man"], points=870, rank=3),
                LeaderboardEntry(user=users["Batman"], points=840, rank=4),
            ]
        )

        Workout.objects.bulk_create(
            [
                Workout(
                    user=users["Iron Man"],
                    title="Repulsor Core Workout",
                    difficulty="hard",
                    duration_minutes=35,
                ),
                Workout(
                    user=users["Spider-Man"],
                    title="Spider Agility Circuit",
                    difficulty="medium",
                    duration_minutes=30,
                ),
                Workout(
                    user=users["Wonder Woman"],
                    title="Lasso Power Session",
                    difficulty="hard",
                    duration_minutes=42,
                ),
                Workout(
                    user=users["Batman"],
                    title="Stealth Endurance Drill",
                    difficulty="medium",
                    duration_minutes=33,
                ),
            ]
        )

        self.stdout.write(self.style.SUCCESS("octofit_db 테스트 데이터 적재가 완료되었습니다."))
