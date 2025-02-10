<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Indosat_Ooredoo_Hutchison_2021.svg" alt="Logo" class="h-8">
      </div>
      <nav class="mt-8">
        <SidebarLink to="/" class="flex items-center space-x-2">
          <span>Dashboard</span>
        </SidebarLink>
        <SidebarLink to="/sleep" class="flex items-center space-x-2">
          <span>Sleep Monitoring</span>
        </SidebarLink>
        <SidebarLink to="/vital-signs" class="flex items-center space-x-2">
          <span>Vital Signs</span>
        </SidebarLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <div class="p-8">
        <header class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold">Smartwatch Monitoring Solution</h1>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-100">
              <span class="sr-only">Notifications</span>
              <!-- Bell icon placeholder -->
            </button>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Super Admin</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Indosat_Ooredoo_Hutchison_2021.svg" alt="Profile" class="h-8 w-8 rounded-full">
            </div>
          </div>
        </header>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Device Status">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-3xl font-bold">500</div>
                <div class="text-sm text-gray-500">Device Registered</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-red-500">10</div>
                <div class="text-sm text-gray-500">Device Offline</div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Abnormal Heart Rate">
            <div class="flex justify-between items-center">
              <div class="text-3xl font-bold">13</div>
              <div class="text-sm text-gray-500">
                <div>120 bpm ↑</div>
                <div>50 bpm ↓</div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Abnormal Sleep Time">
            <div class="flex justify-between items-center">
              <div class="text-3xl font-bold">23</div>
              <div class="text-sm text-gray-500">06h 00m</div>
            </div>
          </DashboardCard>
        </div>

        <!-- Device List and Health Tracking Chart -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="">
            <DeviceList />
          </div>
          <div class="">
            <DashboardCard title="Health Tracking">
              <!-- Chart placeholder - In a real app, implement with Chart.js -->
              <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
                Health Tracking Chart
              </div>
            </DashboardCard>
          </div>
        </div>

        <!-- Sleep Monitoring -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard title="Sleep Monitoring">
            <div class="h-48 bg-gray-100 rounded flex items-center justify-center">
              Sleep Monitoring Chart
            </div>
          </DashboardCard>

          <DashboardCard title="Summary">
            <div class="space-y-4">
              <div class="flex justify-between">
                <span>Heart Rate</span>
                <div>
                  <span class="text-emerald-500">140 bpm</span>
                  <span class="text-red-500 ml-4">66 bpm</span>
                  <span class="text-gray-500 ml-4">70 bpm</span>
                </div>
              </div>
              <div class="flex justify-between">
                <span>Blood Oxygen</span>
                <div>
                  <span class="text-emerald-500">98%</span>
                  <span class="text-red-500 ml-4">86%</span>
                  <span class="text-gray-500 ml-4">96%</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  </div>
</template>
