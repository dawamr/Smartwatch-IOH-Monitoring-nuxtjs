<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    <!-- Device Status Card -->
    <DashboardCard title="Device Status" class="transform transition-all duration-300 hover:shadow-lg">
      <div class="flex justify-between items-center p-4">
        <div class="space-y-2">
          <div class="text-3xl font-bold animate-fade-in">500</div>
          <div class="text-sm text-gray-500">Device Registered</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-red-500 animate-fade-in">10</div>
          <div class="text-sm text-gray-500">Device Offline</div>
        </div>
      </div>
    </DashboardCard>

    <!-- Device List and Health Tracking -->
    <div class="mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
      <div class="lg:w-1/3">
        <DeviceList class="transform transition-all duration-300 hover:shadow-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>
