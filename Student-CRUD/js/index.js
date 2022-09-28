/**
 * Project: Student Management (CRUD)
 * Features:
 *  + Create student
 *  + Read students
 *  + Delete student
 *  + Search student (id + name)
 *  + Update student
 *  + Validate form
 *  + call API
 * Start project
 *  + (PM BA PO) write product requirements document (PRD)
 *  + design
 *  + phân rã lớp đối tượng
 *    (1 lớp SinhVien: maSV, tenSV, dob, email, khoá học, điểm toán, lý,hoá , tinhDiemTrungBinh)
 *  + UI => implement js
 *  + Testing (QC)
 *  + production
 */

var studentList = [];

function createStudent() {
  // 1.lấy input
  var studentId = document.getElementById("txtMaSV").value;
  var fullName = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // 2. check mã sinh viên
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].studentId === studentId) {
      alert("Mã sinh viên đã tồn tại!!!");
      return;
    }
  }

  // 3. tạo object sinh viên mới (input)
  var newStudent = new Student(
    studentId,
    fullName,
    dob,
    email,
    course,
    math,
    physic,
    chemistry
  );

  // 4. push object vào mảng
  studentList.push(newStudent);

  // 5. in danh sách sv ra màn hình
  renderStudents();

  // 6. lưu ds sinh viên vào localstorage
  setStudentList();
}

function renderStudents(data) {
  if (!data) data = studentList;

  var tableHTML = "";
  for (var i = 0; i < data.length; i++) {
    var currentStudent = data[i];
    tableHTML += `<tr>
                <td>${currentStudent.studentId}</td>
                <td>${currentStudent.fullName}</td>
                <td>${currentStudent.email}</td>
                <td>${currentStudent.dob}</td>
                <td>${currentStudent.course}</td>
                <td>${currentStudent.calcGPA().toFixed(2)}</td>
                <td>
                  <button onclick="deleteStudent('${
                    currentStudent.studentId
                  }')" class="btn btn-danger">Xoá</button>

                  <button onclick="getUpdateStudent('${
                    currentStudent.studentId
                  }')" class="btn btn-info">Sửa</button>
                </td>
              </tr>`;
  }
  document.getElementById("tbodySinhVien").innerHTML = tableHTML;
}

function deleteStudent(studentId) {
  var index = findById(studentId);
  if (index === -1) {
    alert("Mã sinh viên không tồn tại");
    return;
  }

  studentList.splice(index, 1);

  setStudentList();

  renderStudents();
}

function findById(studentId) {
  for (var i = 0; i < studentList.length; i++) {
    console.log(studentList[i]);
    if (studentList[i].studentId === studentId) {
      return i;
    }
  }

  return -1;
}

function setStudentList() {
  var studentListJSON = JSON.stringify(studentList);
  localStorage.setItem("SL", studentListJSON);
}

function getStudentList() {
  var studentListJSON = localStorage.getItem("SL");
  if (!studentListJSON) return;

  studentList = mapData(JSON.parse(studentListJSON));

  renderStudents();
}

// input: list local => output: list mới
function mapData(studentListLocal) {
  var result = [];
  for (var i = 0; i < studentListLocal.length; i++) {
    var oldStudent = studentListLocal[i];
    var newStudent = new Student(
      oldStudent.studentId,
      oldStudent.fullName,
      oldStudent.dob,
      oldStudent.email,
      oldStudent.course,
      oldStudent.math,
      oldStudent.physic,
      oldStudent.chemistry
    );
    result.push(newStudent);
  }
  return result;
}

function searchStudents() {
  // document.getElementsByClassName("form-control")  trả về array
  // document.querySelectorAll(".form-control"); trả về array
  // document.getElementById("")

  var keyword = document.querySelector("#txtSearch").value.toLowerCase().trim();

  var result = [];

  for (var i = 0; i < studentList.length; i++) {
    var studentId = studentList[i].studentId;
    var studentName = studentList[i].fullName.toLowerCase();

    if (studentId === keyword || studentName.includes(keyword)) {
      result.push(studentList[i]);
    }
  }

  // result = [student1, student2,...]

  renderStudents(result);
}

window.onload = function () {
  // code sẽ chạy khi window đc load lên
  console.log("window load");
  getStudentList();
};

// update phần 1: lấy thông sinh viên show lên trên form
function getUpdateStudent(studentId) {
  var index = findById(studentId);

  if (index === -1) return alert("Id ko tồn tại!");

  var student = studentList[index];

  // đổ thông tin của student lên input
  document.getElementById("txtMaSV").value = student.studentId;
  document.getElementById("txtTenSV").value = student.fullName;
  document.getElementById("txtEmail").value = student.email;
  document.getElementById("txtNgaySinh").value = student.dob;
  document.getElementById("khSV").value = student.course;
  document.getElementById("txtDiemToan").value = student.math;
  document.getElementById("txtDiemLy").value = student.physic;
  document.getElementById("txtDiemHoa").value = student.chemistry;

  // hiện nút lưu thay đổi, ẩn nút thêm
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnCreate").style.display = "none";

  // disable input mã sinh viên
  document.getElementById("txtMaSV").disabled = true;
}

// update phần 2:  cho người dùng sửa thông tin trên form => nhấn nút lưu thay đổi => chạy hàm update
function updateStudent() {
  var studentId = document.getElementById("txtMaSV").value;
  var fullName = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  var index = findById(studentId);

  var student = studentList[index];

  student.fullName = fullName;
  student.email = email;
  student.dob = dob;
  student.course = course;
  student.math = math;
  student.physic = physic;
  student.chemistry = chemistry;

  renderStudents();

  // hiện lại nút thêm, ẩn nút lưu
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnCreate").style.display = "block";

  // clear toàn bộ input
  document.getElementById("btnReset").click();

  // mở lại input mã sinh viên
  document.getElementById("txtMaSV").disabled = false;
}
//primitive type: string, number ,undefined,null,boolean
var a = 10;
var b = a;

b = 30;

console.log(a, b);

// reference type: object

var student1 = {
  name: "hieu",
  age: 12,
  father: {
    name: "Liêm",
    age: 61,
  },
};

// var student2 = Object.assign({}, student1);

var student2 = JSON.parse(JSON.stringify(student1));

// var student2 = student1;

student2.father.name = "Dũng";

console.log(student1, student2);
