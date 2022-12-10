import jwt
from django.contrib.auth import user_logged_in
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Product, Bucket
from .serializers import ProductSerializer


# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    [
    ]
    return Response(routes)

from django.http import JsonResponse
from urllib.parse import unquote

@api_view(['GET'])
def getProducts(request):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    min = int(request.query_params.get('_minprice'))
    max = int(request.query_params.get('_maxprice'))
    searchValue = unquote(request.query_params.get('_searchvalue'))
    
    if searchValue:
        products = Product.objects.filter(title__icontains= searchValue.lower(), price__gt=min, price__lte=max)
    else:
        products = Product.objects.filter(price__gt=min, price__lte=max)

    size = len(products)
    products = products[(page-1)*limit:page*limit]
    serializer = ProductSerializer(products, many=True)
    for i in range(len(serializer.data)):
        serializer.data[i]["isBucket"] = False
        serializer.data[i]["amount"] = 0
    responce = Response(serializer.data)
    responce["x-total-count"] = size
    return responce


@api_view(['GET'])
def getBasket(request):
    token = request.headers["Authorization"].split()[1]
    user = CustomUser.objects.get(JWT=token)
    bucket = Bucket.objects.filter(user_id=user.id)
    bucket = BucketSerializer(bucket, many=True)
    bucket_id = []
    bucket_data={}
    
    for i in bucket.data:
        bucket_id.append(i["product_id"])
        bucket_data[i["product_id"]] = i["amount"]
    products = Product.objects.filter(id__in=bucket_id)
    products = ProductSerializer(products,many=True)
    for i in products.data:
        i["isBucket"] = True
        i["amount"]= bucket_data[i["id"]]
    response = Response(products.data)
    return response

    


@api_view(['GET'])
def getProductsByUser(request):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    min = int(request.query_params.get('_minprice'))
    max = int(request.query_params.get('_maxprice'))
    searchValue = unquote(request.query_params.get('_searchvalue'))
    if searchValue:
        products = Product.objects.filter(title__icontains= searchValue.lower(), price__gt=min, price__lte=max)
    else:
        products = Product.objects.filter(price__gt=min, price__lte=max)

    size = len(products)
    products = products[(page-1)*limit:page*limit]
    serializer = ProductSerializer(products, many=True)
    for i in range(len(serializer.data)):
        serializer.data[i]["isBucket"] = False
        serializer.data[i]["amount"] = 0
    token = request.headers["Authorization"].split()[1]
    user = CustomUser.objects.get(JWT=token)
    if(user):
        for i in range(len(serializer.data)):
            bucket = Bucket.objects.filter(user_id=user.id, product_id=serializer.data[i]["id"])
            if(len(bucket) > 0):
                bucket = Bucket.objects.get(user_id=user.id, product_id=serializer.data[i]["id"])
                serializer.data[i]["isBucket"] = True
                serializer.data[i]["amount"] = bucket.amount
    responce = Response(serializer.data)
    responce["x-total-count"] = size
    return responce


@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    res={}
    res= serializer.data
    res["isBucket"] = False
    res["amount"] = 0
    return Response(res)

@api_view(['GET'])
def getProductByUser(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    res={}
    res= serializer.data
    token = request.headers["Authorization"].split()[1]
    user = CustomUser.objects.get(JWT=token)
    bucket = Bucket.objects.filter(user_id=user.id, product_id=serializer.data["id"])
    if(len(bucket) > 0):
                bucket = Bucket.objects.get(user_id=user.id, product_id=serializer.data["id"])
                res["isBucket"] = True
                res["amount"] = bucket.amount
    return Response(res)
    

@api_view(['GET'])
def getCategory(request, pk):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    min = int(request.query_params.get('_minprice'))
    max = int(request.query_params.get('_maxprice'))
    searchValue = unquote(request.query_params.get('_searchvalue'));

    if searchValue:
        products = Product.objects.filter(title__icontains=searchValue.lower(),category_id=pk, price__gt=min, price__lte=max)
    else:
        products = Product.objects.filter(category_id=pk, price__gt=min, price__lte=max)
    
    size = len(products)
    products = products[(page - 1) * limit:page * limit]
    serializer = ProductSerializer(products, many=True)
    for i in range(len(serializer.data)):
        serializer.data[i]["isBucket"] = False
        serializer.data[i]["amount"] = 0
    responce = Response(serializer.data)
    responce["x-total-count"] = size
    return responce

    

@api_view(['GET'])
def getCategoryByUser(request, pk):
    limit = int(request.query_params.get('_limit'))
    page = int(request.query_params.get('_page'))
    min = int(request.query_params.get('_minprice'))
    max = int(request.query_params.get('_maxprice'))
    searchValue = unquote(request.query_params.get('_searchvalue'))

    if searchValue:
        products = Product.objects.filter(title__icontains=searchValue.lower(),category_id=pk, price__gt=min, price__lte=max)
    else:
        products = Product.objects.filter(category_id=pk, price__gt=min, price__lte=max)[(page - 1) * limit:page * limit]
    size = len(products)
    products = products[(page - 1) * limit:page * limit]
    serializer = ProductSerializer(products, many=True)

    for i in range(len(serializer.data)):
        serializer.data[i]["isBucket"] = False
        serializer.data[i]["amount"] = 0

    token = request.headers["Authorization"].split()[1]
    user = CustomUser.objects.get(JWT=token)
    if (user):
        for i in range(len(serializer.data)):
            bucket = Bucket.objects.filter(user_id=user.id, product_id=serializer.data[i]["id"])
            if (len(bucket) > 0):
                bucket = Bucket.objects.get(user_id=user.id, product_id=serializer.data[i]["id"])
                serializer.data[i]["isBucket"] = True
                serializer.data[i]["amount"] = bucket.amount
    responce = Response(serializer.data)
    responce["x-total-count"] = size
    return responce

from .models import Category
from django.db.models import Max, Min
@api_view(['GET'])
def getCategoryInfo(request):
    categories = Category.objects.all()
    res = {}
    for category in categories:
        catProducts = Product.objects.filter(category_id=category.id).values()
        max_price = catProducts.aggregate(Max('price'))['price__max']
        min_price = catProducts.aggregate(Min('price'))['price__min']
        res[category.id] = {
            'min_price': min_price,
            'max_price': max_price,
            'verbose_name': category.title,
        }
    return Response(res)

from django.contrib.auth.models import User
from .models import CustomUser
from Trippple import settings
from rest_framework_jwt.utils import jwt_payload_handler
from .serializers import CurrentUserSerializer, BucketSerializer

@api_view(['POST'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    #Обычная авторизация
    if not(request.data["g"]):
        user = User.objects.filter(email=email, password=password)

        if not user:
            return Response("Takogo usera net", status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(email=email)
        customUser =CustomUser.objects.get(user=user.id)
        token = customUser.JWT
        user_details = {}
        user_details['name'] = "%s" % (user.first_name)
        user_details['lastName'] = "%s" % (user.last_name)
        user_details['token'] = token
        user_logged_in.send(sender=user.__class__, request=request, user=user)

        return Response(user_details, status=status.HTTP_200_OK)
    else:
        #Авторизация с гуглом
        user = User.objects.filter(email=email)

        if not user:
            #Если еще ни разу не авторизовывались
            User.objects.create(username=email, email=email, password="", first_name=password, last_name="")
            user = User.objects.get(email=email)
            token = get_tokens_for_user(user)['access']
            CustomUser.objects.create(user=user, JWT=token, phone="")
            user_details = {}
            user_details['name'] = "%s %s" % (user.first_name, user.last_name)
            user_details['token'] = token
            return Response(user_details, status=status.HTTP_200_OK)
        #Если уже авторизовывались    
        user = User.objects.get(email=email)
        customUser =CustomUser.objects.get(user=user.id)
        token = customUser.JWT
        user_details = {}
        user_details['name'] = "%s" % (user.first_name)
        user_details['lastName'] = "%s" % (user.last_name)
        user_details['token'] = token
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return Response(user_details, status=status.HTTP_200_OK)


    

from rest_framework_simplejwt.tokens import RefreshToken
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
@api_view(['POST'])
def register_user(request):
    email = request.data['email']
    password = request.data['password']
    name = request.data['name']
    surname = request.data['lastName']
    phone = request.data['phone']
    user = User.objects.filter(email=email)
    if not user:
        User.objects.create(username=email, email=email, password=password, first_name=name, last_name=surname)
        user = User.objects.get(email=email)
        #payload = jwt_payload_handler(user)
        #token = jwt.encode(payload, settings.SECRET_KEY)
        token = get_tokens_for_user(user)['access']
        CustomUser.objects.create(user=user, JWT=token, phone=phone)
        user_details = {}
        user_details['name'] = "%s %s" % (user.first_name, user.last_name)
        user_details['token'] = token
        return Response(user_details, status=status.HTTP_200_OK)
    else:
        return Response("User yze yest", status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def getUser(request):
    token = request.headers["Authorization"].split()[1]
    user = CustomUser.objects.filter(JWT=token)
    if user:
        user = CustomUser.objects.get(JWT=token)
        bucket = Bucket.objects.filter(user_id=user.id)
        serializer = BucketSerializer(bucket, many=True)
        user_details = {}
        user_details['name'] = "%s" % (user.user.first_name)
        user_details['lastName'] = "%s" % (user.user.last_name)
        user_details['id'] = user.user.id
        user_details['bucket'] = serializer.data
        return Response(user_details, status=status.HTTP_200_OK)
    else:
        return Response("JWT is not valide", status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def addBucket(request):
    try:
        token = request.headers["Authorization"].split()[1]
        user = CustomUser.objects.filter(JWT=token)
        if user:
            user = CustomUser.objects.get(JWT=token)
            amount = 1
            product_id = request.data["product_id"]
            product = Product.objects.get(id=product_id)
            Bucket.objects.create(user_id=user, amount=amount, product_id=product)
            return Response(status=status.HTTP_200_OK)
    except:
        return Response("not JWT or not user", status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def deleteBucket(request):
    try:
        token = request.headers["Authorization"].split()[1]
        user = CustomUser.objects.get(JWT=token)
        product_id = request.data["product_id"]
        product = Product.objects.get(id=product_id)
        Bucket.objects.get(user_id=user,product_id=product).delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response("not JWT or not user", status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def changeAmountBucket(request):
    try:
        token = request.headers["Authorization"].split()[1]
        user = CustomUser.objects.get(JWT=token)
        amount = request.data['amount']
        product_id = request.data['product_id']
        product = Product.objects.get(id=product_id)
        bucket = Bucket.objects.get(user_id=user, product_id=product)
        bucket.amount = amount
        bucket.save(update_fields=["amount"])
        return Response(status=status.HTTP_200_OK)
    except:
        return Response("not JWT or not user or not bucket", status=status.HTTP_400_OK)

from Accessories.models import *
@api_view(['POST'])
def getProductForConfigurator(request):
    category_id = request.data["index"]+1
    params = request.data["data"]
    res = {"data": []}

    if (category_id == 1):
        products = Product.objects.filter(category_id=1)
        for product in products:
            serializer = ProductSerializer(product, many=False)
            tmp = serializer.data
            tmp["is_graphic"] = CPU.objects.get(id=product.accessory_id).is_graphic
            res["data"].append(tmp)

    if (category_id == 2):
        id = params[0]
        CPU_id = Product.objects.get(id=id).accessory_id
        CPUitem = CPU.objects.get(id=CPU_id)
        if(CPUitem.is_graphic == True):
            res["data"].append({id:"-1"})
        products = Product.objects.filter(category_id=2)
        for product in products:
            serializer = ProductSerializer(product, many=False)
            res["data"].append(serializer.data)

    if (category_id == 3):
        id = params[0]
        CPU_id = Product.objects.get(id=id).accessory_id
        CPUitem = CPU.objects.get(id=CPU_id)
        MBs = Motherboard.objects.filter(socket_id=CPUitem.socket_id,RAMtype=CPUitem.RAMtype).values()
        for mb in list(MBs):
            product = Product.objects.get(accessory_id=mb['id'], category_id=category_id)
            serializer = ProductSerializer(product, many=False)
            res["data"].append(serializer.data)

    if (category_id == 4):
        id = params[0]
        CPU_id = Product.objects.get(id=id).accessory_id
        CPUitem = CPU.objects.get(id=CPU_id)

        id = params[2]
        MB_id = Product.objects.get(id=id).accessory_id
        MBitem = Motherboard.objects.get(id=MB_id)

        RAMmax = min(CPUitem.RAMmax, MBitem.maxAmountRAM)
        countRAM = MBitem.countslotsRAM

        RAMs = RAM.objects.filter(RAMtype=MBitem.RAMtype).values()

        for ram in list(RAMs):
            product = Product.objects.get(accessory_id=ram['id'], category_id=category_id)
            amount = 0
            if(ram['countRAM'] > RAMmax):
                break
            for i in range(5):
                if(ram['countRAM']*i <= RAMmax):
                    amount = i
            serializer = ProductSerializer(product, many=False)
            tmp = serializer.data
            tmp["amount"] = min(amount, countRAM)
            res["data"].append(tmp)


    if (category_id == 5):

        products = Product.objects.filter(category_id=5)
        for product in products:
            serializer = ProductSerializer(product, many=False)
            res["data"].append(serializer.data)

        products = Product.objects.filter(category_id=6)
        for product in products:
            serializer = ProductSerializer(product, many=False)
            res["data"].append(serializer.data)

    if (category_id == 6):
        id = params[0]
        CPU_id = Product.objects.get(id=id).accessory_id
        CPUitem = CPU.objects.get(id=CPU_id)
        TPD = CPUitem.TPD

        id = params[1]
        if(id != -1):
            GPU_id = Product.objects.get(id=id).accessory_id
            GPUitem = GPU.objects.get(id=GPU_id)
            TPD += GPUitem.TPD

        ids = params[4]
        for id in ids:
            MEM = Product.objects.get(id=id[0])
            MEM_id = MEM.accessory_id
            if(MEM.category_id == 5):
                MEMitem = Memory.objects.get(id=MEM_id)
                TPD += MEMitem.TPD
            if(MEM.category_id == 6):
                MEMitem = SSDMemory.objects.get(id=MEM_id)
                TPD += MEMitem.TPD

        PSs = PS.objects.filter(power__gt = TPD*1.3).values()
        for ps in list(PSs):
            product = Product.objects.get(accessory_id=ps['id'], category_id=7)
            serializer = ProductSerializer(product, many=False)
            res["data"].append(serializer.data)

    return Response(res)


@api_view(['POST'])
def postConfigurator(request):
        choosen = request.data["choosen"]
        token = request.headers["Authorization"].split()[1]
        user = CustomUser.objects.filter(JWT=token)
        if user:
            user = CustomUser.objects.get(JWT=token)
            for i in range(6):
                if i!=3 and i!=4:
                    amount = 1
                    product_id = choosen[i]
                    product = Product.objects.get(id=product_id)
                    if (Bucket.objects.filter(user_id=user, product_id=product)):
                        bucket = Bucket.objects.get(user_id=user, product_id=product)
                        bucket.amount += amount
                        bucket.save(update_fields=["amount"])
                    else:
                        Bucket.objects.create(user_id=user, amount=amount, product_id=product)
                else:
                    for j in choosen[i]:
                        amount = j[1]
                        product_id = j[0]
                        product = Product.objects.get(id=product_id)
                        if (Bucket.objects.filter(user_id=user, product_id=product)):
                            bucket = Bucket.objects.get(user_id=user, product_id=product)
                            bucket.amount += amount
                            bucket.save(update_fields=["amount"])
                        else:
                            Bucket.objects.create(user_id=user, amount=amount, product_id=product)
            return Response(status=status.HTTP_200_OK)
    


