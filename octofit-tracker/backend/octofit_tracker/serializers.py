from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["id", "name", "universe"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["id"] = str(instance.id)
        return data


class UserSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta:
        model = UserProfile
        fields = ["id", "name", "email", "team"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["id"] = str(instance.id)
        data["team"] = str(instance.team_id)
        return data


class ActivitySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = Activity
        fields = ["id", "user", "activity_type", "duration_minutes", "calories_burned"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["id"] = str(instance.id)
        data["user"] = str(instance.user_id)
        return data


class LeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = LeaderboardEntry
        fields = ["id", "user", "points", "rank"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["id"] = str(instance.id)
        data["user"] = str(instance.user_id)
        return data


class WorkoutSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = Workout
        fields = ["id", "user", "title", "difficulty", "duration_minutes"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["id"] = str(instance.id)
        data["user"] = str(instance.user_id)
        return data
