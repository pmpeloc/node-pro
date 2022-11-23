from locust import task, TaskSet, HttpLocust
import json

class UserBehaviour_UserA(TaskSet):
  def on_start(self):
    response = self.client.post('/auth/login', {email: 'john@mail.com', password: '12345'})
    self.token = response.json()['accessToken']

  @task(10)
  def list_users(self):
    self.client.get('/user', headers={'Authorization': "Bearer {}".format(self.token)})

  @task(2)
  def list_one_user(self):
    self.client.get('/user/824cf76d-95ec-463a-9ff8-ee62ff518628', headers={'Authorization': "Bearer {}".format(self.token)})

class UserBehaviour_UserB(TaskSet):
  def on_start(self):
    response = self.client.post('/auth/login', {email: 'john@mail.com', password: '12345'})
    self.token = response.json()['accessToken']

  @task(3)
  def list_users(self):
    self.client.get('/user', headers={'Authorization': "Bearer {}".format(self.token)})

  @task(5)
  def list_one_user(self):
    self.client.get('/user/824cf76d-95ec-463a-9ff8-ee62ff518628', headers={'Authorization': "Bearer {}".format(self.token)})

class Test_UserA(HttpLocust):
  task_set = UserBehaviour_UserA
  min_wait = 2000
  max_wait = 5000

class Test_UserB(HttpLocust):
  task_set = UserBehaviour_UserB
  min_wait = 3000
  max_wait = 4000