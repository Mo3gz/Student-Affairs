from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='main'),
    path('main/', views.index, name='main'),
    path('add/', views.addS, name='addS'),
    path('edit/', views.edit, name='edit'),
    path('edit/<int:student_id>/', views.editInfo, name='editInfo'),  
    path('update/', views.update, name='update'),
    path('view/', views.view, name='view'),
    path('homepage/', views.homepage, name='homepage'),
    path('delete/<str:student_id>/', views.delete, name='delete'),
]
