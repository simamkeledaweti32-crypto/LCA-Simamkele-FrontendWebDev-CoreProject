import { dummyEmployees } from './dummyEmployees.js';

const { createApp, ref, computed, watch, onMounted } = Vue;

createApp({
  setup() {
    // State
    const employees = ref([]);
    const selectedEmployee = ref(null);
    const activeView = ref('directory');
    const sidebarOpen = ref(false);
    const selectedEmployeeForPayroll = ref(null);
    const payslipData = ref(null);
    const message = ref(null);
    const newEmployee = ref({ fullName: '', department: '', position: '', monthlySalary: null });

    // Load data from localStorage on start
    onMounted(() => {
      const savedEmployees = localStorage.getItem('mt_employees');
      employees.value = savedEmployees ? JSON.parse(savedEmployees) : dummyEmployees;
    });

    // Save data to localStorage whenever employees change
    watch(employees, (newVal) => {
      localStorage.setItem('mt_employees', JSON.stringify(newVal));
    }, { deep: true });

    // Computed Properties
    const allLeaveRequests = computed(() => {
      return employees.value.flatMap(emp => 
        emp.pendingLeaveRequests.map(req => ({ ...req, employeeId: emp.id, employeeName: emp.fullName }))
      );
    });

    const pendingRequestCount = computed(() => {
      return allLeaveRequests.value.filter(req => req.status === 'Pending').length;
    });

    const topAttendance = computed(() => {
      if (employees.value.length === 0) return 0;
      return Math.max(...employees.value.map(emp => emp.attendanceRate));
    });

    // Methods
    const showMessage = (text, type = 'success') => {
      message.value = { text, type };
      setTimeout(() => { message.value = null }, 3000);
    }

    const selectEmployee = (emp) => {
      selectedEmployee.value = emp;
    }

    const getEmployeeName = (id) => {
      return employees.value.find(emp => emp.id === id)?.fullName || 'Unknown';
    }

    const getPendingLeaveForEmployee = (id) => {
      const emp = employees.value.find(emp => emp.id === id);
      return emp ? emp.pendingLeaveRequests.filter(req => req.status === 'Pending') : [];
    }

    const addEmployee = () => {
      if (!newEmployee.value.fullName || !newEmployee.value.department || !newEmployee.value.position || !newEmployee.value.monthlySalary) {
        showMessage('Please fill all fields', 'error');
        return;
      }
      const newId = employees.value.length > 0 ? Math.max(...employees.value.map(e => e.id)) + 1 : 1;
      employees.value.push({
        id: newId,
        fullName: newEmployee.value.fullName,
        department: newEmployee.value.department,
        position: newEmployee.value.position,
        monthlySalary: newEmployee.value.monthlySalary,
        email: `${newEmployee.value.fullName.toLowerCase().replace(' ', '.')}@moderntech.com`,
        attendanceRate: 100,
        employmentHistory: [],
        pendingLeaveRequests: []
      });
      newEmployee.value = { fullName: '', department: '', position: '', monthlySalary: null };
      showMessage('Employee added successfully!');
    }

    const generatePayslip = () => {
      if (!selectedEmployeeForPayroll.value) {
        showMessage('Please select an employee', 'error');
        return;
      }
      const emp = selectedEmployeeForPayroll.value;
      const tax = emp.monthlySalary * 0.18;
      const deductions = 500;
      const netSalary = emp.monthlySalary - tax - deductions;
      payslipData.value = {
        name: emp.fullName,
        monthlySalary: emp.monthlySalary,
        tax: tax,
        deductions: deductions,
        netSalary: netSalary,
        annualSalary: emp.monthlySalary * 12
      };
    }

    const updateLeaveStatus = (requestId, newStatus) => {
      employees.value.forEach(emp => {
        const req = emp.pendingLeaveRequests.find(r => r.id === requestId);
        if (req) {
          req.status = newStatus;
          showMessage(`Leave request ${newStatus}`);
        }
      });
    }

    const clockInOut = (emp) => {
      emp.attendanceRate = emp.attendanceRate === 100 ? emp.attendanceRate - 5 : 100; // toggle for demo
      showMessage(`Attendance updated for ${emp.fullName}`);
    }

    return {
      employees, selectedEmployee, activeView, sidebarOpen, selectedEmployeeForPayroll, payslipData, message, newEmployee,
      allLeaveRequests, pendingRequestCount, topAttendance,
      selectEmployee, getEmployeeName, getPendingLeaveForEmployee, addEmployee, generatePayslip, updateLeaveStatus, clockInOut
    };
  }
}).mount('#app');
