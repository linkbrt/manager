from django.contrib import admin

from .models import Toy


class ToyAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'amount', 'age']
    search_fields = ['title', 'price', 'amount', 'age']
    list_filter = ['title', 'price', 'amount', 'age']


admin.site.register(Toy, ToyAdmin)