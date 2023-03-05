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

## not equal
```
Model.find({
    field: {$ne: value}
})
```

## equal
```
Model.find({
    field: {$eq: value}
})


```

## Aggregate
Phương thức aggregate trong MongoDB có ít nhất hai tham số bắt buộc, đó là:

#### pipeline: Đây là một mảng các giai đoạn (stage) thực hiện các phép tính tổng hợp trên các tài liệu trong collection. Các giai đoạn này được sắp xếp theo thứ tự, nghĩa là kết quả của giai đoạn trước sẽ được truyền cho giai đoạn tiếp theo để xử lý.
```
Pipeline trong phương thức aggregate của MongoDB là một mảng các giai đoạn (stage) thực hiện các phép tính tổng hợp trên các tài liệu trong collection. Các giai đoạn này được sắp xếp theo thứ tự, nghĩa là kết quả của giai đoạn trước sẽ được truyền cho giai đoạn tiếp theo để xử lý. Pipeline có thể chứa các giai đoạn sau:

$match: Lọc các tài liệu dựa trên một hoặc nhiều điều kiện.
$group: Nhóm các tài liệu theo các trường và tính toán các giá trị tổng hợp (sum, average, max, min, etc.).
$project: Chọn các trường để xuất ra kết quả, tạo ra các trường tính toán mới hoặc đổi tên các trường.
$sort: Sắp xếp các tài liệu theo một hoặc nhiều trường.
$limit: Giới hạn số lượng tài liệu xuất ra.
$skip: Bỏ qua một số lượng tài liệu ở đầu kết quả.
$unwind: Phân tách một trường mảng thành các tài liệu riêng lẻ.
$lookup: Tra cứu các tài liệu từ collection khác dựa trên một hoặc nhiều trường.
$addFields: Thêm một trường tính toán mới vào các tài liệu.
$replaceRoot: Thay đổi tài liệu gốc bằng một trường khác.
$count: Đếm số lượng tài liệu trong pipeline hiện tại.

Các giai đoạn này có thể được sử dụng độc lập hoặc kết hợp với nhau để thực hiện các phép tính tổng hợp trên các tài liệu trong collection.
```

#### callback: Đây là một hàm xử lý kết quả trả về từ phương thức aggregate. Kết quả trả về có thể là một mảng các tài liệu hoặc một giá trị đơn, tùy thuộc vào các giai đoạn được xử lý.
```
Model.agggregate([
    {
        $match: {...}
    },
    {
        $lookup: {...}
    },
    {
        $unwind: {...}
    },
    {
        $project: {...}
    },
    {
        $sort: {...}
    }
], function(err, result) {
     if (err) {
        return res.status(404).json({ message: err });
     } else {
       // do something
       res.json(result);
     }
});
```
