function Student(id, name, dob, email, course, math, physic, chemistry) {
  this.studentId = id;
  this.fullName = name;
  this.dob = dob;
  this.email = email;
  this.course = course;
  this.math = math;
  this.physic = physic;
  this.chemistry = chemistry;
  this.calcGPA = function () {
    return (this.math + this.physic + this.chemistry) / 3;
  };
}
