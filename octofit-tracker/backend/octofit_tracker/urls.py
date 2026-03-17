import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardViewSet,
    TeamViewSet,
    UserViewSet,
    WorkoutViewSet,
)

CODESPACE_NAME = os.environ.get('CODESPACE_NAME')
if CODESPACE_NAME:
    base_url = f"https://{CODESPACE_NAME}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'teams', TeamViewSet, basename='teams')
router.register(r'activities', ActivityViewSet, basename='activities')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutViewSet, basename='workouts')

COLLECTION_PATHS = ('users', 'teams', 'activities', 'leaderboard', 'workouts')


def api_root(_request):
    return JsonResponse(
        {name: f'{base_url}/api/{name}/' for name in COLLECTION_PATHS}
    )

urlpatterns = [
    path('', api_root, name='root-api'),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
