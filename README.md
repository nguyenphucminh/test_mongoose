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
## Replica set (transaction)
Trong thực tế, nhiều trường hợp để server hoạt động ổn định người ta dùng nhiều hơn 1 server để lưu dữ liệu. Ví dụ dùng 2 server mongodb là A và B, khi có dữ liệu mới được lưu vào A thì nó sẽ tiến hành sao lưu, đồng bộ sang B (quá trình replica) nếu A bị chết hoặc mất dữ liệu thì ta chuyển sang kết nối tới B để lấy dữ liệu như thế sẽ đảm bảo server luôn hoạt động và dữ liệu tin cậy không bị mất mát.

Quá trình replication này khác với quá trình backup / sao lưu ở chỗ là nó thực hiện realtime. Tức là khi bạn thêm dữ liệu vào A thì nó sẽ lập tức đồng bộ sang B… Trong khi quá trình backup thì thường thực hiện theo lịch (chạy cuối mỗi ngày, chạy hàng giờ…) và có thể phải xây dựng lại chỉ mục / index

(Sử dụng nhiều server có nhiều lợi ích thế nhưng không phải lúc nào cũng áp dụng nhé. Việc sử dụng nhiều server MongoDB kéo theo nhiều vấn đề như cấu hình và code phức tạp hơn, chi phí tăng…)

#### Replica Set trong MongoDB
Replica Set là một nhóm các server MongoDB trong hệ Replication. (Một nhóm server MongoDB tham gia thực hiện việc nhân bản.)

Mỗi server MongoDB trong Replica Set được coi là 1 node hoặc 1 thể hiện.

Trong một Replica Set, sẽ có:
+  1 node chính (primary node)
+  2 node phụ trở lên (secondary node)
+  1 node trọng tài (arbiter node:  quá trình bầu primary node giống như bỏ phiếu vậy, node nào nhiều phiếu hơn thì trở thành primary node. Tuy nhiên sẽ có trường hợp có 2 node cùng số phiếu. Trong trường hợp này node arbiter sẽ quyết định node nào là primary node. Arbiter node chỉ có tác dụng ra bầu ra primary node chứ không chứa dữ liệu). 
Vì vậy, để có một arbiter trong replica set MongoDB, bạn cần tối thiểu 3 replica set member. Tuy nhiên, tốt nhất nên cấu hình ít nhất 4 replica set member để đảm bảo tính sẵn sàng và khả năng chịu lỗi cao hơn.

Primary node sẽ thực hiện nhận tất cả các write request để thực hiện thêm/sửa/xóa data, các thay đổi trên data này sẽ được ghi lại vào file oplog, khi file oplog thay đổi, nó sẽ dựa vào các thông tin thay đổi đó để đồng bộ dữ liệu sang các secondary node. (arbiter node sẽ không thực hiện ghi dữ liệu)


![image](https://user-images.githubusercontent.com/59383987/224598622-f3c9bc38-4216-46be-9694-0d63c438463d.png)

#### Cơ chế Automatic Failover trong Replica Set
Các node trong Replica Set luôn duy trì kết nối với nhau (kết nối heartbeat ). Khi primary node bị mất kết nối với các node còn lại (bị shutdown, connection timeout…) thì các node còn lại sẽ tự động sẽ tự động bầu ra 1 node làm primary node.

![image](https://user-images.githubusercontent.com/59383987/224598519-a1adc707-e4d0-46e7-8498-339866020245.png)

Quá trình bầu primary node giống như bỏ phiếu vậy, node nào nhiều phiếu hơn thì trở thành primary node. Tuy nhiên sẽ có trường hợp có 2 node cùng số phiếu. Trong trường hợp này node arbiter sẽ quyết định node nào là primary node.

(Arbiter node chỉ có tác dụng ra bầu ra primary node chứ không chứa dữ liệu)
![image](https://user-images.githubusercontent.com/59383987/224598551-d2bac17e-2bcf-416f-8d23-779ad7fd0486.png)

Khi primary node bị ngắt kết nối lúc trước được kết nối trở lại vào Replica Set thì nó sẽ trở thành secondary node.

Mặc định, Client sẽ đọc dữ liệu từ primary node. Tuy nhiên ta có thể cấu hình cho phép client đọc dữ liệu từ các secondary node để giảm tải áp lực cho primary node.

primary node là mặc định, mọi read request sẽ chỉ đi đến primary node

primary nodePreferred: mọi read request sẽ đi đến primary node nhưng nếu primary node down nó sẽ đi đến secondary node

secondary node: mọi read request chỉ đi đến các secondary node.

secondary nodePreferred: mọi read request sẽ đi đến secondary node nhưng nếu tất cả các secondary node down nó sẽ đi đến primary node.

nearest: read request sẽ đến node có network latency thấp nhất không phân biết node đó là primary node hay secondary node. Tham số read preference bạn sẽ khai báo từ application.
