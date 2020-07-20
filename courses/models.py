from django.db import models
from django import forms
from django.contrib.auth.models import User

# Create your models here.

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    fullName = models.CharField(max_length=50, null=True)
    phone = models.CharField(max_length=10, null=True)
    about = models.TextField(null=True ,default="אין נתונים להצגה")
    img = models.ImageField(default='../static/images/default_profile_img.jpg' , null=True , blank=True) 
    objects = models.Manager()

    def get_model_type(self):
        return "סטודנט"

    def __str__(self):
        return self.fullName

class Mentor(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    fullName = models.CharField(max_length=50, null=True)
    phone = models.CharField(max_length=10, null=True)
    about = models.TextField(null=True ,default="אין נתונים להצגה")
    img = models.ImageField(default='../static/images/default_profile_img.jpg' , null=True , blank=True)
    objects = models.Manager()

    def get_model_type(self):
        return "מנטור"

    def __str__(self):
        return self.fullName

  
class Course(models.Model):
    id = models.AutoField(primary_key=True)
    mentor = models.ForeignKey(Mentor, null=True, on_delete=models.CASCADE)
    courseName = models.CharField(max_length=100, null=True)
    courseYear = models.CharField(max_length=10, null=True)
    currentIntersted = models.PositiveIntegerField(default=0)
    maxInterested = models.PositiveIntegerField(default=1)
    moreInfo = models.TextField(null=True)
    datePublished = models.DateTimeField(auto_now_add=True, null=True)
    img = models.ImageField(default='../static/images/courses-cover/default.jpg' , null=True , blank=True)
    objects = models.Manager()


class InterestedStudent(models.Model):
    id = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, null=True, on_delete=models.CASCADE)
    Course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    objects = models.Manager()


