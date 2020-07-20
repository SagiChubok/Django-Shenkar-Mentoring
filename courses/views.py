
from django.http import HttpResponse, JsonResponse

from django.shortcuts import render, redirect, get_object_or_404

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required

from django.db.models import F , Q

from .models import *
from .decorators import *

from datetime import datetime


# Create your views here.
#print("TEST", flush=True)

#HOMEPAGE
def homepage(request):
    if request.user.is_authenticated:
        group = request.user.groups.all()[0].name
        if group == "Mentor":
            return redirect('show_courses')
        elif group == "Student":
            return redirect('search_courses')
    else:
        return render(request, 'courses/index.html')

def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(username=username, password=password)
        if user:
            login(request,user)
            group = request.user.groups.all()[0].name
            if group == "Mentor":
                return redirect('show_courses')
            elif group == "Student":
                return redirect('search_courses')
        else:
          messages.info(request,"שם משתמש או סיסמא לא תקינים")

    return render(request, 'courses/index.html')

def register_user(request):
    if request.method == "POST":
        username = request.POST.get('registerID','')
        password = request.POST.get('registerPass','')
        email = request.POST.get('mail','')

        if not (User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()):
            newUser = User.objects.create_user(username,email,password)
            userType = request.POST.get('usertype','')

            if userType == "מנטור":
                newMentor = Mentor(user = newUser,fullName = request.POST.get('fullName','') ,phone = request.POST.get('phone','') )
                newMentor.save()
                newUser.groups.add(Group.objects.get(name = 'Mentor'))

            elif userType == "סטודנט":
                newStudent = Student(user = newUser,fullName = request.POST.get('fullName','') ,phone = request.POST.get('phone','') )
                newStudent.save()
                newUser.groups.add(Group.objects.get(name = 'Student'))

            messages.success(request,"נרשמת בהצלחה למערכת")

        else:
            messages.error(request,"מייל או שם משתמש כבר תפוסים")

    return redirect('homepage')

def logout_user(request):
    logout(request)
    return redirect('homepage')


#PROFILE
@login_required(login_url="homepage")
def show_profile(request, user_id):
    try:
        mentor = Mentor.objects.get(user = user_id)
        if mentor:
            courses = Course.objects.filter(mentor = mentor)
            args = {'user': mentor , 'courses':courses}
            return render(request, 'courses/show_profile.html', args )
    except:
        student = get_object_or_404(Student, user = user_id)
        args =  {'user': student}
        return render(request, 'courses/show_profile.html', args)

@login_required(login_url = "homepage")
def edit_profile(request):
    return render(request, 'courses/edit_profile.html')

def update_profile(request):
    group = request.user.groups.all()[0].name
    if group == "Mentor":
        myuser = Mentor.objects.get(user = request.user.id)
    elif group == "Student":
        myuser = Student.objects.get(user = request.user.id)

    if myuser:

        myuser.phone = request.GET.get('inputPhone','')
        myuser.about = request.GET.get('aboutInput','')
        newimg = request.FILES.get('uploadImage','')
        if newimg != "":
            myuser.img = newimg
        myuser.save()

        request.user.email = request.GET.get('inputEmail','')
        request.user.save()

    return redirect('show_profile', request.user.id)


#COURSES
def get_courses(request):
    courses = Course.objects.filter(~Q(currentIntersted=F('maxInterested'))).order_by('-datePublished')
    args =  {'courses':list(courses.values()) }
    return JsonResponse(args)

def get_mentor(request, mentor_id, course_id):
    mentor = Mentor.objects.get(id = mentor_id)
    course = Course.objects.get(id = course_id)
    flag = -1
    try:
        found = InterestedStudent.objects.get(Student = request.user.student , Course = course)
        if found:
            flag = 1
    except:
        flag = 0

    return JsonResponse([mentor.fullName, mentor.user.id, flag], safe=False)

@login_required(login_url="homepage")
@mentor_only
def show_courses(request):
    try:
        courses = Course.objects.filter(mentor = request.user.mentor ).order_by('-id')
        args =  {'courses':courses}
        return render(request, 'courses/show_courses.html', args)
    except:
        return render(request, 'courses/show_courses.html')

@login_required(login_url="homepage")
@student_only
def search_courses(request):
    return render(request, 'courses/search_courses.html')



def add_course(request):
    year = request.GET.get('stdyear','')
    course = request.GET.get('stdcrs','')
    try:
        duplicate = Course.objects.get(mentor = request.user.mentor , courseName = course)
        messages.error(request,"לא ניתן להוסיף את אותו הקורס בשנית")
    except:
        if year != "" and course != "":
            courseimg = ""
            if course == "חדו''א מוגבר 1" or course == "אנליזה נומרית יישומית":
                courseimg = "../static/images/courses-cover/math.jpg"

            elif course == "פיסיקה 1":
                courseimg = "../static/images/courses-cover/physics.jpg"

            elif course == "תכנות 1 - מבוא":
                courseimg = "../static/images/courses-cover/introduction-programming.jpg"

            elif course == "מערכות סיפרתיות":
                courseimg = "../static/images/courses-cover/digital-systems.jpg"

            elif course == "הנדסת חשמל למהנדסי תוכנה":
                courseimg = "../static/images/courses-cover/electricity.jpg"

            elif course == "ארגון ותכנות המחשב" or course == "תכן לוגי":
                courseimg = "../static/images/courses-cover/assembly.jpg"

            elif course == "תכנות 2 - תכנות מערכות" or course == "תכנות 3 - תכנות מונחה עצמים" or course == "ניתוח ותיכון מונחה עצמים" or course == "שיטות בהנדסת תוכנה":
                courseimg = "../static/images/courses-cover/programming.jpg"

            elif course == "אלגברה לינארית":
                courseimg = "../static/images/courses-cover/linear-algebra.jpg"

            elif course == "עיצוב ממשקי משתמש":
                courseimg = "../static/images/courses-cover/HCI.jpg"

            elif course == "מבוא לסטטיסטיקה והסתברות":
                courseimg = "../static/images/courses-cover/statistics.jpg"

            elif course == "מבנה מחשבים":
                courseimg = "../static/images/courses-cover/computer-architecture.jpg"

            elif course == "מבני נתונים" or course == "מבוא לאלגוריתמים":
                courseimg = "../static/images/courses-cover/data_structure_algorithms.jpg"

            elif course == "מתמטיקה בדידה וקומבינטוריקה" or course == "לוגיקה מתמטית ותורת הקבוצות":
                courseimg = "../static/images/courses-cover/discrete-math.jpg"

            elif course == "אנגלית טכנית":
                courseimg = "../static/images/courses-cover/english.jpg"

            elif course == "מבוא להנדסת ווב וענן":
                courseimg = "../static/images/courses-cover/web-and-cloud.jpg"

            elif course == "בינה מלאכותית":
                courseimg = "../static/images/courses-cover/AI.jpg"

            elif course == "מבוא למערכות חכמות":
                courseimg = "../static/images/courses-cover/iot.jpg"

            elif course == "מערכות קבצים ומסדי נתונים":
                courseimg = "../static/images/courses-cover/database.jpg"

            elif course == "ג'אווה":
                courseimg = "../static/images/courses-cover/java.jpg"

            elif course == "תקשורת ותקשוב":
                courseimg = "../static/images/courses-cover/ict.jpg"

            elif course == "מארג האינטרנט":
                courseimg = "../static/images/courses-cover/mern-stack.jpg"

            elif course == "אוטומטים וקומפילציה":
                courseimg = "../static/images/courses-cover/automata.jpg"

            elif course == "מערכות הפעלה":
                courseimg = "../static/images/courses-cover/operating-system.jpg"

            elif course == "תכנות פייתון למהנדסים":
                courseimg = "../static/images/courses-cover/python.jpg"

            elif course == "סמינר פרויקט גמר - 1" or course == "סמינר פרויקט גמר - 2"  or course == "סמינר בהנדסת תוכנה":
                courseimg = "../static/images/courses-cover/software-engineering.jpg"

            elif course == "מערכות מחשב מקביליות":
                courseimg = "../static/images/courses-cover/parallel-computing.jpg"

            elif course == "חישוביות סיבוכיות ושפות פורמליות":
                courseimg = "../static/images/courses-cover/formal-languages.jpg"

            elif course == "הנדסת אבטחה":
                courseimg = "../static/images/courses-cover/security-engineering.jpg"

            elif course == "ניהול והבטחת איכות בפרויקטי תוכנה":
                courseimg = "../static/images/courses-cover/quality-assurance.jpg"

            elif course == "גרפיקה ממוחשבת":
                courseimg = "../static/images/courses-cover/computer-graphics.jpg"



            newCourse = Course(mentor = request.user.mentor ,courseName = course ,courseYear = year ,maxInterested=request.GET.get('intmax',''),moreInfo=request.GET.get('moreCourseInfo',''))
            if(courseimg != ""):
                newCourse.img = courseimg

            newCourse.save()

    return redirect('show_courses')

def update_course(request,course_id):
    course = Course.objects.get(id = course_id)
    if course:
        course.moreInfo = request.GET.get('updateinfocrs','')
        course.datePublished = datetime.now()
        course.save()

    return redirect('show_courses')

def delete_course(request,course_id):
    course = Course.objects.get(id = course_id)
    if course:
        course.delete()

    return redirect('show_courses')



def toggle_interested(request, course_id):
    course = Course.objects.get(id = course_id)
    try:
        found = InterestedStudent.objects.get(Student = request.user.student , Course = course)
        if found:
            if course:
                course.currentIntersted = course.currentIntersted - 1
                course.save()
                found.delete()   # מחיקה לטבלה

    except:
        current_interested = course.currentIntersted    # חישוב מתעניינים נוכחי בקורס לפי קוד
        max_interested = course.maxInterested          # חישוב מתעניינים מקסימלי בקורס לפי קוד
        if current_interested < max_interested:
            if course:
                course.currentIntersted = course.currentIntersted + 1
                course.save()
                newInterestedStudent = InterestedStudent(Student = request.user.student , Course = course )   # הוספה לטבלה
                newInterestedStudent.save()
    return redirect('search_courses')


def get_interested(request, course_id):
    try:
        course = Course.objects.get(id = course_id)
        courses = InterestedStudent.objects.filter(Course = course)
        if courses:
            if course:
                args =  {'courses':list(courses.values()) }
                return JsonResponse(args,safe=False)
    except:
        print("error")


def get_student(request, student_id):
    student = Student.objects.get(id = student_id)
    arr = [student.fullName],[student.phone],[student.user.email],[student.user.id],[student.img.url]
    args =  {'student':list(arr) }
    return JsonResponse(args,safe=False)
