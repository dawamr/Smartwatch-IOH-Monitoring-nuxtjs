<template>
  <div class="device-list">
    <DashboardCard title="Daftar Perangkat">
      <div v-if="loading" class="text-center py-4">Loading...</div>
      <div v-else-if="error" class="text-red-500 py-4">
        {{ error }}
      </div>
      <div v-else class="divide-y max-h-96 overflow-y-auto">
        <div
          v-for="device in devices"
          :key="device.id"
          class="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-blue-50': selectedDeviceId === device.id }"
          @click="$emit('select-device', device.id)"
        >
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-600 text-sm">{{ device.name?.charAt(0) || 'D' }}</span>
            </div>
            <div>
              <div class="font-medium">{{ device.name || 'Unnamed Device' }}</div>
              <div class="text-sm text-gray-500">{{ device.email_pic || 'No Email' }}</div>
              <div class="text-xs text-gray-400">Status: {{ device.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '~/services/api.service';
import type { Device } from '~/types';
import { defineProps, defineEmits } from 'vue';

const router = useRouter();
const devices = ref<Device[]>([]);
const loading = ref(true);
const error = ref('');

const fetchDevices = async () => {
  try {
    loading.value = true;
    devices.value = await apiService.getDevices();
  } catch (err) {
    error.value = 'Gagal memuat data perangkat';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const viewDeviceDetails = (deviceId: string) => {
  router.push(`/devices/${deviceId}`);
};

onMounted(() => {
  fetchDevices();
});

defineProps({
  devices: {
    type: Array as PropType<Device[]>,
    required: true,
  },
  selectedDeviceId: {
    type: String,
    required: true,
  },
});

defineEmits<{
  (e: 'select-device', deviceId: string): void;
}>();
</script>

<style scoped>
.device-list {
  padding: 20px;
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.device-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
}

.device-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.device-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.device-actions button:hover {
  background-color: #45a049;
}

.loading {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
  text-align: center;
  padding: 20px;
}
</style>
