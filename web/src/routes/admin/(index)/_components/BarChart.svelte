<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  interface Props {
    total_delivered: {
      date: string;
      count: number;
    }[];
  }

  const { total_delivered }: Props = $props();

  let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
  let chartInstance: Chart | null = $state(null);

  // needs optimize for now lets cohers this sht
  const chartValues: number[] = total_delivered.map((item) => item.count);
  const chartLabels: string[] = total_delivered.map((item) => item.date);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      createChart();
    }
  });

  function createChart() {
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Delivered this month',
            backgroundColor: '#91B43F',
            data: chartValues
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          x: {
            display: true,
            offset: true
          },
          y: {
            display: true,
            offset: true
          }
        },
        plugins: {}
      }
    });
  }

  /* $effect(() => {
		if (chartInstance) {
			chartInstance.data.datasets[0].backgroundColor = theme.get();
			chartInstance.update();
		}
	}); */
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>

<style>
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
