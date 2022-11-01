from django.contrib.auth.models import User
from django.forms import forms

from .models import CustomUser

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('phone', 'role')