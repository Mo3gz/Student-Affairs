from django.shortcuts import get_object_or_404, render, redirect
from .models import Student
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render

def index(request):
    return render(request,'students/main.html')


def addS(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        nat_id = request.POST.get('NatID')
        name = request.POST.get('name')
        gpa = request.POST.get('Gpa')
        level = request.POST.get('level')
        depart = request.POST.get('Depart')
        statu = request.POST.get('status')
        gender = request.POST.get('gender')

        exists = Student.objects.filter(student_id=id).exists()

        if exists: 
            message = "ID Already Exists" 
            return render(request, 'students/addS.html', {'message': message})

        student = Student(
            student_id=id,
            SSN=nat_id,
            Name=name,
            Gpa=gpa,
            Level=level,
            Department=depart,
            Status=statu,
            Gender=gender
        )
        
        try:
            student.save()
            return redirect('view')

        except Exception as e:
            return HttpResponseNotFound()

    return render(request, 'students/addS.html')

def view(request):
    students = Student.objects.all()
    return render(request, 'students/view.html', {'students': students})
    
def update(request):
    if request.method == 'POST':
        student_id = request.POST.get('ID')
        department = request.POST.get('department')

        try:
            student = Student.objects.get(student_id=student_id)
            if (student.Level not in [3,4]):
                return JsonResponse(response, status=404)
            
            student.Department = department
            student.save()
            response = {
                'message': 'Student department updated successfully.'
            }
            return JsonResponse(response)
        except Student.DoesNotExist:
            response = {
                'message': 'Student not found.'
            }
            return JsonResponse(response, status=404)

    return render(request, 'students/update.html')


def homepage(request):
    return render(request,'students/homepage.html')

def edit(request):
    if request.method == 'POST':
        student_id = request.POST.get('ID')
        exists = Student.objects.filter(student_id=student_id).exists()
        try:
            student = Student.objects.get(student_id=student_id)
            return JsonResponse({'exists': True, 'student_id': student_id})

        except Student.DoesNotExist:
            return JsonResponse({'exists': False})
    return render(request, 'students/id_exists.html')


def editInfo(request, student_id):
    student = get_object_or_404(Student, student_id=student_id)

    if request.method == 'POST':
        ssn = request.POST.get('NatID')
        name = request.POST.get('Name')
        gpa = request.POST.get('Gpa')
        level = request.POST.get('Level')
        status = request.POST.get('Status')

        student.SSN = ssn
        student.Name = name
        student.Gpa = gpa
        student.Level = level
        student.Status = status
        student.save()

        return redirect('view') 

    return render(request, 'students/edit.html', {'student': student})


def delete(request, student_id):
    student = get_object_or_404(Student, student_id=student_id)
    student.delete()
    return redirect('view')
