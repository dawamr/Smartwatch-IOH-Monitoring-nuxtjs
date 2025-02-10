<template>
  <DashboardCard title="Device List">
    <div v-if="loading" class="text-center py-4">
      Loading devices...
    </div>
    <div v-else-if="error" class="text-red-500 py-4">
      {{ error }}
    </div>
    <div v-else class="divide-y max-h-96 overflow-y-auto">
      <div v-for="device in devices" :key="device.id" class="py-3 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span class="text-gray-600 text-sm">{{ device.name?.charAt(0) || 'D' }}</span>
          </div>
          <div>
            <div class="font-medium">{{ device.name || 'Unnamed Device' }}</div>
            <div class="text-sm text-gray-500">{{ device.email_pic || 'No ID' }}</div>
          </div>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup>
import { onMounted } from 'vue'
const { devices, loading, error, fetchDevices } = useDevices()

onMounted(() => {
  fetchDevices()
})
</script>
