## Operator mongoose

## RegExp
```
Model.find({
    username: /something/
})
```
## greater than, and greater than or equal to
```
$gt $gte
Model.find({
    age: {$gt: 20},
    salary: {$gte: 2000},
})
```
## less than, and less than or equal to
```
$lt $lte
```

## complicated conditions
limit(number)
skip(number): skip previous elements
sort(any)

```
Model.find({
    user: `somthing`
})
.skip(2)
.limit(2)
.sort('age')
.then(data=>{
    console.log(data)
})
```
## or
```
$or: [condition1, condition2]

Model.find({
    $or: [
        {age: {$lt: 20}},
        {salary: {$gt: 2000}}
    ]
}) 

```
## in
form ... to ..
```
Model.find({
    salary: {$in: [1000, 2000]}
})
```
