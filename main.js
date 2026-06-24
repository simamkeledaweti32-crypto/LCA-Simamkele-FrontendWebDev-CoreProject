import { createApp, ref, reactive, computed, watch } from 'vue';
import { dummyEmployees } from './data/dummyEmployees.js';

const app = {
  setup() {
    const STORAGE_KEY = 'moderntech-hr-employees';
    const activeView = ref('Employee Directory');
    const selectedEmployeeId = ref(null);
    const sidebarVisible = ref(true);
    const currentPayslip = ref(null);

    const employees = ref(loadEmployees());

    watch(employees, saveEmployees, { deep: true });

    function loadEmployees() {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Failed to parse employee data from localStorage:', error);
        }
      }
      return dummyEmployees;
    }

    function saveEmployees() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees.value));
    }

    const selectedEmployee = computed(() => {
      return employees.value.find((employee) => employee.id === selectedEmployeeId.value) || null;
    });

    const pendingRequests = computed(() => {
      return employees.value.flatMap((employee) =>
        employee.pendingLeaveRequests.map((request) => ({
          employeeId: employee.id,
          requestId: request.id,
          fullName: employee.fullName,
          leaveType: request.leaveType,
          startDate: request.startDate,
          endDate: request.endDate,
          status: request.status
        }))
      ).filter((request) => request.status === 'Pending');
    });

    const pendingRequestCount = computed(() => pendingRequests.value.length);

    const topAttendance = computed(() => {
      return [...employees.value]
        .sort((a, b) => b.attendanceRate - a.attendanceRate)
        .slice(0, 5);
    });

    function getAnnualSalary(employee) {
      return employee && typeof employee.monthlySalary === 'number'
        ? employee.monthlySalary * 12
        : 0;
    }

    function generatePayslip(employee) {
      if (!employee) return null;
      return {
        employeeId: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        monthlySalary: employee.monthlySalary,
        annualSalary: getAnnualSalary(employee),
        generatedAt: new Date().toISOString().slice(0, 10),
        status: 'Draft'
      };
    }

    function approveLeave(employeeId, requestId) {
      const employee = employees.value.find((item) => item.id === employeeId);
      if (!employee) return;
      const request = employee.pendingLeaveRequests.find((item) => item.id === requestId);
      if (!request) return;
      request.status = 'Approved';
      employee.attendanceRate = Math.max(0, Math.min(100, employee.attendanceRate + 1));
      saveEmployees();
    }

    function denyLeave(employeeId, requestId) {
      const employee = employees.value.find((item) => item.id === employeeId);
      if (!employee) return;
      const request = employee.pendingLeaveRequests.find((item) => item.id === requestId);
      if (!request) return;
      request.status = 'Denied';
      saveEmployees();
    }

    function viewPayslip(employee) {
      currentPayslip.value = generatePayslip(employee);
    }

    function changeView(viewName) {
      activeView.value = viewName;
    }

    function selectEmployee(employeeId) {
      selectedEmployeeId.value = employeeId;
    }

    return {
      activeView,
      sidebarVisible,
      employees,
      selectedEmployeeId,
      selectedEmployee,
      pendingRequests,
      pendingRequestCount,
      topAttendance,
      currentPayslip,
      changeView,
      selectEmployee,
      approveLeave,
      denyLeave,
      viewPayslip
    };
  }
};

createApp(app).mount('#app');
