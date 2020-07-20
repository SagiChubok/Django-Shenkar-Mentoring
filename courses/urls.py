from django.urls import path 
from . import views


urlpatterns = [
    path('', views.homepage , name="homepage"),

    path('register/', views.register_user , name="register_user"),
    path('login/', views.login_user , name="login_user"),
    path('logout/', views.logout_user , name="logout_user"),


    path('profile/<int:user_id>', views.show_profile , name="show_profile"),
    path('profile/edit/', views.edit_profile, name="edit_profile"),
    path('profile/edit/update', views.update_profile, name="update_profile"),


    path('courses/', views.show_courses, name="show_courses"),
    path('courses/getinterested/<int:course_id>', views.get_interested, name="get_interested"),
    path('courses/getstudent/<int:student_id>', views.get_student, name="get_student"),


    path('courses/search', views.search_courses, name="search_courses"),
    path('courses/getcourses', views.get_courses, name="get_courses"),
    path('courses/getmentor/<int:mentor_id>/<int:course_id>', views.get_mentor, name="get_mentor"),
    path('courses/add',views.add_course,name="add_course"),
    path('courses/update/<int:course_id>',views.update_course,name="update_course"),
    path('courses/delete/<int:course_id>',views.delete_course,name="delete_course"),

    path('courses/toggleinterested/<int:course_id>', views.toggle_interested, name="toggle_interested"),



]
