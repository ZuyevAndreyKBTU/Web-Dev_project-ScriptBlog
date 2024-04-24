from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    owner = models.ForeignKey('auth.User', related_name='categories', on_delete=models.CASCADE)
    posts = models.ManyToManyField('Post', related_name='categories', blank=True)

    class Meta:
        verbose_name_plural = 'categories'

class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=76, blank=True, default='Script for ...')
    body = models.TextField(max_length=2000, blank=True, default='')
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']

class Clap(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='claps')
    count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.count} claps for {self.post.title}"

class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=2000,blank=False)
    owner = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']