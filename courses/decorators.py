from django.shortcuts import redirect

def mentor_only(view_func):
	def wrapper_function(request, *args, **kwargs):
		group = None
		if request.user.groups.exists():
			group = request.user.groups.all()[0].name

		if group == 'Mentor':
			return view_func(request, *args, **kwargs)   
			     
		elif group == 'Student':
			return redirect('search_courses')

	return wrapper_function

def student_only(view_func):
	def wrapper_function(request, *args, **kwargs):
		group = None
		if request.user.groups.exists():
			group = request.user.groups.all()[0].name

		if group == 'Student':
			return view_func(request, *args, **kwargs)        

		elif group == 'Mentor':
			return redirect('show_courses')

	return wrapper_function