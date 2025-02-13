<template>
  <div class="flex h-screen transition-all duration-300">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md transition-all duration-300 transform lg:translate-x-0">
      <div class="p-4 border-b border-gray-100">
        <img src="@/assets/images/ioh-lg-logo.png" alt="Logo" class="h-8 transition-transform hover:scale-105" />
      </div>
      <nav class="mt-8">
        <SidebarLink
          to="/"
          class="flex items-center space-x-2 px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <span>Dashboard</span>
        </SidebarLink>
        <SidebarLink
          to="/sleep"
          class="flex items-center space-x-2 px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <span>Sleep Monitoring</span>
        </SidebarLink>
        <SidebarLink
          to="/vital-signs"
          class="flex items-center space-x-2 px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <span>Vital Signs</span>
        </SidebarLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <div class="p-4 sm:p-6 lg:p-8">
        <header class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 class="text-2xl font-bold text-gray-800">Smartwatch Monitoring Solution</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <input type="datetime-local" v-model="dateRange.start" class="px-3 py-2 border rounded-md text-sm" />
              <span class="text-gray-500">to</span>
              <input type="datetime-local" v-model="dateRange.end" class="px-3 py-2 border rounded-md text-sm" />
            </div>
            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <span class="sr-only">Notifications</span>
              <!-- Bell icon placeholder -->
            </button>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Super Admin</span>
              <img
                src="@/assets/images/ioh-sm-logo.png"
                alt="Profile"
                class="h-8 w-8 rounded-full transition-transform hover:scale-110"
              />
            </div>
          </div>
        </header>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <DashboardCard title="Device Status" class="transform transition-all duration-300 hover:shadow-lg">
            <div class="flex justify-between items-center p-4">
              <div class="space-y-2">
                <div class="text-3xl font-bold animate-fade-in">{{ devices.length }}</div>
                <div class="text-sm text-gray-500">Device Registered</div>
              </div>
              <div class="space-y-2">
                <div class="text-3xl font-bold text-red-500 animate-fade-in">
                  {{ devices.filter((device) => device.status != 'published').length }}
                </div>
                <div class="text-sm text-gray-500">Device Offline</div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Abnormal Heart Rate" class="transform transition-all duration-300 hover:shadow-lg">
            <div class="flex justify-between items-center p-4">
              <div class="text-3xl font-bold animate-fade-in">13</div>
              <div class="text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <span>120 bpm</span>
                  <span class="text-red-500">↑</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>50 bpm</span>
                  <span class="text-blue-500">↓</span>
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Abnormal Sleep Time" class="transform transition-all duration-300 hover:shadow-lg">
            <div class="flex justify-between items-center p-4">
              <div class="text-3xl font-bold animate-fade-in">23</div>
              <div class="text-sm text-gray-500">06h 00m</div>
            </div>
          </DashboardCard>
        </div>

        <!-- Device List and Health Tracking Table -->
        <div class="mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div class="lg:w-1/3">
            <DeviceList
              :devices="devices"
              :selectedDeviceId="selectedDeviceId"
              @select-device="handleDeviceSelect"
              class="transform transition-all duration-300 hover:shadow-lg"
            />
          </div>

          <div class="lg:w-2/3">
            <DashboardCard title="Health Tracking" class="transform transition-all duration-300 hover:shadow-lg">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Date Time</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Heart Rate</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Blood Oxygen</th>
                      <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Pressure</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="health in healthData" :key="health.id" class="hover:bg-gray-50">
                      <td class="px-4 py-2 text-sm text-gray-500">
                        {{ formatDateTime(health.start_time_utc) }}
                      </td>
                      <td class="px-4 py-2 text-sm" :class="getHealthValueColor(health.data_type, health.string_val)">
                        {{ health.data_type === 'heart_rate' ? health.string_val + ' bpm' : '-' }}
                      </td>
                      <td class="px-4 py-2 text-sm" :class="getHealthValueColor(health.data_type, health.string_val)">
                        {{ health.data_type === 'blood_oxygen' ? health.string_val + '%' : '-' }}
                      </td>
                      <td class="px-4 py-2 text-sm" :class="getHealthValueColor(health.data_type, health.string_val)">
                        {{ health.data_type === 'pressure' ? health.string_val : '-' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>
        </div>

        <!-- Sleep Monitoring -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <DashboardCard title="Sleep Monitoring" class="transform transition-all duration-300 hover:shadow-lg">
            <div class="h-48 bg-gray-100 rounded flex items-center justify-center">Sleep Monitoring Table</div>
          </DashboardCard>

          <DashboardCard title="Summary" class="transform transition-all duration-300 hover:shadow-lg">
            <div class="space-y-4 p-4">
              <div class="flex justify-between items-center">
                <span class="font-medium">Heart Rate</span>
                <div class="space-x-4">
                  <span class="text-emerald-500 font-medium">{{ healthSummary?.heartRate?.max }} bpm</span>
                  <span class="text-red-500 font-medium">{{ healthSummary?.heartRate?.min }} bpm</span>
                  <span class="text-gray-500">{{ healthSummary?.heartRate?.average }} bpm</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-medium">Blood Oxygen</span>
                <div class="space-x-4">
                  <span class="text-emerald-500 font-medium">{{ healthSummary?.bloodOxygen?.max }}%</span>
                  <span class="text-red-500 font-medium">{{ healthSummary?.bloodOxygen?.min }}%</span>
                  <span class="text-gray-500">{{ healthSummary?.bloodOxygen?.average }}%</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Device, HealthSummary, Health } from '~/types';
import { apiService } from '~/services/api.service';

const devices = ref<Device[]>([]);
const selectedDeviceId = ref<string>('');
const healthSummary = ref<HealthSummary>({
  heartRate: {
    max: 0,
    min: 0,
    average: 0,
  },
  bloodOxygen: {
    max: 0,
    min: 0,
    average: 0,
  },
});
const healthData = ref<Health[]>([]);

const dateRange = ref({
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000).toISOString().slice(0, 16), // 7 hari yang lalu
  end: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16), // sekarang
});

const fetchHealthSummary = async (deviceId: string, startDate: string, endDate: string) => {
  try {
    const start = toJakartaISOString(startDate);
    const end = toJakartaISOString(endDate);

    healthSummary.value = await apiService.getHealthSummary(deviceId, start, end);
  } catch (error) {
    console.error('Gagal memuat data kesehatan:', error);
  }
};

const fetchHealthData = async (deviceId: string, startDate: string, endDate: string) => {
  try {
    const start = toJakartaISOString(startDate);
    const end = toJakartaISOString(endDate);

    healthData.value = await apiService.getHealthByDevice(deviceId, start, end);
  } catch (error) {
    console.error('Gagal memuat data kesehatan:', error);
  }
};

const getHealthValueColor = (type: string, value: number) => {
  if (type === 'heart_rate') {
    if (value > 100) return 'text-red-500';
    if (value < 60) return 'text-blue-500';
    return 'text-green-500';
  }
  if (type === 'blood_oxygen') {
    if (value < 95) return 'text-red-500';
    return 'text-green-500';
  }
  return 'text-gray-600';
};

// Fungsi untuk mengubah format datetime ke GMT+7
const formatDateTime = (timestamp: string) => {
  // Buat objek date dari timestamp
  const date = new Date(timestamp);

  // Tambahkan offset GMT+7 (7 jam dalam milidetik)
  const jakartaTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  return jakartaTime.toLocaleString('id-ID', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
};

// Fungsi untuk mengkonversi datetime-local ke ISO String dengan timezone Jakarta
const toJakartaISOString = (dateString: string) => {
  const date = new Date(dateString);
  // Kurangi 7 jam untuk mengkompensasi perbedaan timezone saat mengirim ke API
  const utcDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
  return utcDate.toISOString();
};

onMounted(async () => {
  try {
    devices.value = await apiService.getDevices();
    if (devices.value.length > 0) {
      selectedDeviceId.value = devices.value[0].id;
      await Promise.all([
        fetchHealthSummary(selectedDeviceId.value, dateRange.value.start, dateRange.value.end),
        fetchHealthData(selectedDeviceId.value, dateRange.value.start, dateRange.value.end),
      ]);
    }
  } catch (error) {
    console.error('Gagal memuat data:', error);
  }
});

watch([dateRange, selectedDeviceId], async ([newDateRange, deviceId]) => {
  if (deviceId) {
    await Promise.all([
      fetchHealthSummary(deviceId, newDateRange.start, newDateRange.end),
      fetchHealthData(deviceId, newDateRange.start, newDateRange.end),
    ]);
  }
});

const handleDeviceSelect = (deviceId: string) => {
  selectedDeviceId.value = deviceId;
};
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar Styles */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Firefox Scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

/* Smooth Scroll Behavior */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar when not hovering */
.overflow-y-auto {
  scrollbar-width: thin;
  transition: all 0.3s ease;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: transparent;
}

.overflow-y-auto:hover::-webkit-scrollbar-thumb {
  background: #c1c1c1;
}
</style>
