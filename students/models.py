from django.db import models

class Student(models.Model):
    Name = models.CharField(max_length=255)
    SSN = models.CharField(max_length=14)
    student_id = models.IntegerField()
    Gpa = models.DecimalField(max_digits=5, decimal_places=4)
    Level = models.IntegerField()
    Department = models.CharField(max_length=255)
    Status = models.IntegerField(default=0)
    Gender = models.CharField(max_length=10)
    
    class Meta:
        unique_together = ('SSN', 'student_id')

    def __str__(self):
        return self.Name
    