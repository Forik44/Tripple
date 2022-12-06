from collections import OrderedDict

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from ..models import *
from Accessories.models import *
from django.conf import settings
from ..serializers import ProductSerializer
from rest_framework import status


class ProductApiTestCase(APITestCase):
    def test_getProduct1(self):
        category = Category.objects.create(title="CPU")
        prod1 = Product.objects.create(title="Процессор Intel Core i7-11700 OEM",
        content= "Соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу специалистов участие в формировании системы обучения кадров, соответствующей насущным потребностям. Не следует, однако, забывать о том, что повышение уровня гражданского сознания в значительной степени обуславливает создание соответствующих условий активизации! Повседневная практика показывает, что реализация намеченного плана развития требует определения и уточнения форм воздействия! Дорогие друзья, курс на социально-ориентированный национальный проект обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия.",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        url = '/api/shop/?_page=1&_limit=4&_searchValue='
        responce = self.client.get(url)
        self.assertEqual([OrderedDict([('id', 1), ('title', 'Процессор Intel Core i7-11700 OEM'), ('content', 'Соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу специалистов участие в формировании системы обучения кадров, соответствующей насущным потребностям. Не следует, однако, забывать о том, что повышение уровня гражданского сознания в значительной степени обуславливает создание соответствующих условий активизации! Повседневная практика показывает, что реализация намеченного плана развития требует определения и уточнения форм воздействия! Дорогие друзья, курс на социально-ориентированный национальный проект обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия.'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 25999), ('accessory_id', 6), ('category_id', 1), ('isBucket', False), ('amount', 0)])]
        , responce.data)

    def test_getProduct2(self):
        category = Category.objects.create(title="CPU")
        prod1 = Product.objects.create(title="Процессор Intel Core i7-11700 OEM",
        content= "Не следует, однако, забывать о том, что Повседневная практика системы массового участия.",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        prod2 = Product.objects.create(title="Процессор Intel Core i7-11700 OEM",
                                       content="Соображения массового участия.",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=252349,
                                       accessory_id=7,
                                       category_id=category)
        url = '/api/shop/?_page=1&_limit=4&_searchValue='
        responce = self.client.get(url)
        self.assertEqual([OrderedDict([('id', 2), ('title', 'Процессор Intel Core i7-11700 OEM'), ('content', 'Не следует, однако, забывать о том, что Повседневная практика системы массового участия.'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 25999), ('accessory_id', 6), ('category_id', 2), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 3), ('title', 'Процессор Intel Core i7-11700 OEM'), ('content', 'Соображения массового участия.'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 252349), ('accessory_id', 7), ('category_id', 2), ('isBucket', False), ('amount', 0)])]
        , responce.data)

    def test_getProduct3(self):

        url = '/api/shop/?_page=1&_limit=4&_searchValue='
        responce = self.client.get(url)
        self.assertEqual([]
        , [])

    def test_getProduct4(self):
        category = Category.objects.create(title="CPU")
        prod1 = Product.objects.create(title="Процессор",
                                       content= "Не",
                                       photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published= True,
                                       price= 25999,
                                       accessory_id= 6,
                                       category_id= category)
        prod2 = Product.objects.create(title="Процессор",
                                       content="Сообра",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=252349,
                                       accessory_id=7,
                                       category_id=category)
        prod3 = Product.objects.create(title="Процессор",
                                       content="Сообра",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=2522349,
                                       accessory_id=7,
                                       category_id=category)
        prod4 = Product.objects.create(title="Процессор",
                                       content="Сообра",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=2532349,
                                       accessory_id=7,
                                       category_id=category)
        url = '/api/shop/?_page=1&_limit=4&_searchValue='
        responce = self.client.get(url)
        self.assertEqual([OrderedDict([('id', 4), ('title', 'Процессор'), ('content', 'Не'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 25999), ('accessory_id', 6), ('category_id', 3), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 5), ('title', 'Процессор'), ('content', 'Сообра'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 252349), ('accessory_id', 7), ('category_id', 3), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 6), ('title', 'Процессор'), ('content', 'Сообра'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2522349), ('accessory_id', 7), ('category_id', 3), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 7), ('title', 'Процессор'), ('content', 'Сообра'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2532349), ('accessory_id', 7), ('category_id', 3), ('isBucket', False), ('amount', 0)])]
        , responce.data)

    def test_getProduct5(self):
            category = Category.objects.create(title="CPU")
            prod1 = Product.objects.create(title="Процессор",
                                           content="Не",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=25999,
                                           accessory_id=6,
                                           category_id=category)
            prod2 = Product.objects.create(title="Процессор",
                                           content="Сообра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=252349,
                                           accessory_id=7,
                                           category_id=category)
            prod3 = Product.objects.create(title="Процессор",
                                           content="Сооdбра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2522349,
                                           accessory_id=7,
                                           category_id=category)
            prod4 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            prod5 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            url = '/api/shop/?_page=1&_limit=4&_searchValue='
            responce = self.client.get(url)
            self.assertEqual([OrderedDict([('id', 8), ('title', 'Процессор'), ('content', 'Не'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 25999), ('accessory_id', 6), ('category_id', 4), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 9), ('title', 'Процессор'), ('content', 'Сообра'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 252349), ('accessory_id', 7), ('category_id', 4), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 10), ('title', 'Процессор'), ('content', 'Сооdбра'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2522349), ('accessory_id', 7), ('category_id', 4), ('isBucket', False), ('amount', 0)]), OrderedDict([('id', 11), ('title', 'Процессор'), ('content', 'Сообраybt'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2532349), ('accessory_id', 7), ('category_id', 4), ('isBucket', False), ('amount', 0)])]
            , responce.data)

    def test_getProduct6(self):
            category = Category.objects.create(title="CPU")
            prod1 = Product.objects.create(title="Процессор",
                                           content="Не",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=25999,
                                           accessory_id=6,
                                           category_id=category)
            prod2 = Product.objects.create(title="Процессор",
                                           content="Сообра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=252349,
                                           accessory_id=7,
                                           category_id=category)
            prod3 = Product.objects.create(title="Процессор",
                                           content="Сооdбра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2522349,
                                           accessory_id=7,
                                           category_id=category)
            prod4 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            prod5 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            url = '/api/shop/?_page=2&_limit=4&_searchValue='
            responce = self.client.get(url)
            self.assertEqual([OrderedDict([('id', 17), ('title', 'Процессор'), ('content', 'Сообраybt'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2532349), ('accessory_id', 7), ('category_id', 5), ('isBucket', False), ('amount', 0)])]
            , responce.data)

    def test_getProduct7(self):
            category = Category.objects.create(title="CPU")
            prod1 = Product.objects.create(title="Процессор",
                                           content="Не",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=25999,
                                           accessory_id=6,
                                           category_id=category)
            prod2 = Product.objects.create(title="Процессор",
                                           content="Сообра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=252349,
                                           accessory_id=7,
                                           category_id=category)
            prod3 = Product.objects.create(title="Процессор",
                                           content="Сооdбра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2522349,
                                           accessory_id=7,
                                           category_id=category)
            prod4 = Product.objects.create(title="Процссор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            prod5 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            url = '/api/shop/?_page=2&_limit=4&_searchValue=е'
            responce = self.client.get(url)
            self.assertEqual([]
            , responce.data)

    def test_getProduct8(self):
            category = Category.objects.create(title="CPU")
            prod1 = Product.objects.create(title="Процессор",
                                           content="Не",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=25999,
                                           accessory_id=6,
                                           category_id=category)
            prod2 = Product.objects.create(title="Процессор",
                                           content="Сообра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=252349,
                                           accessory_id=7,
                                           category_id=category)
            prod3 = Product.objects.create(title="Процессор",
                                           content="Сооdбра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2522349,
                                           accessory_id=7,
                                           category_id=category)
            prod4 = Product.objects.create(title="Процссор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            prod5 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            url = '/api/shop/?_page=1&_limit=4&_searchValue=Процссор'
            responce = self.client.get(url)
            self.assertEqual([OrderedDict([('id', 26), ('title', 'Процссор'), ('content', 'Сообраybt'), ('photo', '/media/media/photos/2022/12/03/CPU_ADr1P3V.png'), ('is_published', True), ('price', 2532349), ('accessory_id', 7), ('category_id', 7), ('isBucket', False), ('amount', 0)])]
            , responce.data)

    def test_getProduct9(self):
            category = Category.objects.create(title="CPU")
            prod1 = Product.objects.create(title="Процессор",
                                           content="Не",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=25999,
                                           accessory_id=6,
                                           category_id=category)
            prod2 = Product.objects.create(title="Процессор",
                                           content="Сообра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=252349,
                                           accessory_id=7,
                                           category_id=category)
            prod3 = Product.objects.create(title="Процессор",
                                           content="Сооdбра",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2522349,
                                           accessory_id=7,
                                           category_id=category)
            prod4 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            prod5 = Product.objects.create(title="Процессор",
                                           content="Сообраybt",
                                           photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                           is_published=True,
                                           price=2532349,
                                           accessory_id=7,
                                           category_id=category)
            url = '/api/shop/?_page=2&_limit=5&_searchValue='
            responce = self.client.get(url)
            self.assertEqual([]
            , responce.data)

    def test_getProduct10(self):
        self.assertEqual([], [])

    def test_register1(self):
        Role.objects.create(title="default", id = 1)
        url = '/api/register'
        email = "test@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email":email, "password":password, "name":name, "lastName":surname, "phone":phone} )
        CustomUser.objects.get(phone=phone)
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_register2(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "test@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email":email, "password":password, "name":name, "lastName":surname, "phone":phone} )
        url = '/api/register'
        email = "test@gmail.com"
        password = "12"
        name = "Tes2t"
        surname = "Test2ovich"
        phone = "88005352353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual(status.HTTP_400_BAD_REQUEST, responce.status_code)

    def test_register3(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "test@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email":email, "password":password, "name":name, "lastName":surname, "phone":phone} )
        url = '/api/register'
        email = "test1@gmail.com"
        password = "12"
        name = "Tes2t"
        surname = "Test2ovich"
        phone = "88005352353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_register4(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = ""
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_register5(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = ""
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("8800535353", CustomUser.objects.get(phone=phone).phone)

    def test_register6(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("lol@gmail.com", CustomUser.objects.get(phone=phone).user.email)

    def test_register7(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("1", CustomUser.objects.get(phone=phone).user.password)

    def test_register8(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("Test", CustomUser.objects.get(phone=phone).user.first_name)

    def test_register9(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("Testovich", CustomUser.objects.get(phone=phone).user.last_name)

    def test_register10(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        self.assertEqual("lol@gmail.com", CustomUser.objects.get(phone=phone).user.email)

    def test_login1(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=False
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": email, "password": password, "g": g})
        self.assertEqual(responce.data["name"], "Test")

    def test_login2(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=False
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": email, "password": password, "g": g})
        self.assertEqual(responce.data["lastName"], "Testovich")

    def test_login3(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=False
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": "2123", "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login4(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=False
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": email, "password": "2123", "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login5(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=False
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": password, "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login6(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=True
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": password, "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login7(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=True
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": password, "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login8(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=True
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": password, "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login9(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=True
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": email, "password": password, "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_login10(self):
        Role.objects.create(title="default2", id = 1)
        url = '/api/register'
        email = "lol@gmail.com"
        password = "1"
        name = "Test"
        surname ="Testovich"
        phone = "8800535353"
        g=True
        responce = self.client.post(url, {"email": email, "password": password, "name": name, "lastName": surname,
                                          "phone": phone})
        url = '/api/login'
        responce = self.client.post(url, {"email": "12", "password": "", "g": g})
        self.assertEqual(status.HTTP_200_OK, responce.status_code)

    def test_getProducts1(self):
        category = Category.objects.create(title="CPU")
        prod1 = Product.objects.create(id=1,
        title="Процессор Intel Core i7-11700 OEM",
        content= ".",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        url = '/api/shop/1'
        responce = self.client.get(url)
        self.assertEqual({'id': 1, 'title': 'Процессор Intel Core i7-11700 OEM', 'content': '.', 'photo': '/media/media/photos/2022/12/03/CPU_ADr1P3V.png', 'is_published': True, 'price': 25999, 'accessory_id': 6, 'category_id': 9, 'isBucket': False, 'amount': 0}
        , responce.data)

    def test_getProducts2(self):
        category = Category.objects.create(title="CPU", id =1)
        prod1 = Product.objects.create(id=2,
        title="Процессор Intel Core i7-11700 OEM",
        content= ".",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        url = '/api/shop/2'
        responce = self.client.get(url)
        self.assertEqual({'id': 2, 'title': 'Процессор Intel Core i7-11700 OEM', 'content': '.', 'photo': '/media/media/photos/2022/12/03/CPU_ADr1P3V.png', 'is_published': True, 'price': 25999, 'accessory_id': 6, 'category_id': 1, 'isBucket': False, 'amount': 0}
        , responce.data)

    def test_getProducts3(self):
        category = Category.objects.create(title="CPU", id=1)
        prod1 = Product.objects.create(id=1,
        title="Процессор Intel Core i7-11700 OEM",
        content= ".",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        prod2 = Product.objects.create(id=2,
                                       title="роцессор Intel Core i7-11700 OEM",
                                       content=".",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=25999,
                                       accessory_id=6,
                                       category_id=category)
        url = '/api/shop/2'
        responce = self.client.get(url)
        self.assertEqual({'id': 2, 'title': 'роцессор Intel Core i7-11700 OEM', 'content': '.', 'photo': '/media/media/photos/2022/12/03/CPU_ADr1P3V.png', 'is_published': True, 'price': 25999, 'accessory_id': 6, 'category_id': 1, 'isBucket': False, 'amount': 0}
        , responce.data)

    def test_getProducts4(self):
        category = Category.objects.create(title="CPU", id=1)
        prod1 = Product.objects.create(id=1,
        title="Процессор Intel Core i7-11700 OEM",
        content= ".",
        photo= "/media/photos/2022/12/03/CPU_ADr1P3V.png",
        is_published= True,
        price= 25999,
        accessory_id= 6,
        category_id= category)
        prod2 = Product.objects.create(id=2,
                                       title="роцессор Intel Core i7-11700 OEM",
                                       content=".",
                                       photo="/media/photos/2022/12/03/CPU_ADr1P3V.png",
                                       is_published=True,
                                       price=25999,
                                       accessory_id=6,
                                       category_id=category)
        url = '/api/shop/1'
        responce = self.client.get(url)
        self.assertEqual({'id': 1, 'title': 'Процессор Intel Core i7-11700 OEM', 'content': '.', 'photo': '/media/media/photos/2022/12/03/CPU_ADr1P3V.png', 'is_published': True, 'price': 25999, 'accessory_id': 6, 'category_id': 1, 'isBucket': False, 'amount': 0}
        , responce.data)
    def test_getRoutes(self):
        url = '/api/'
        responce = self.client.get(url)