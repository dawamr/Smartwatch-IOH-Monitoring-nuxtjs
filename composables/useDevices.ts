import { ref } from 'vue'

export const useDevices = () => {
  const devices = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDevices = async () => {
    loading.value = true
    try {
      const response = await fetch('/api?getData=Devices')
      const data = await response.json()
      devices.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    devices,
    loading,
    error,
    fetchDevices
  }
}
