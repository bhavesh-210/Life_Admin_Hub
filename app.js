/* global Chart */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('spendingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Create vertical linear fill gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

    // Mock Data for different months
    const mockData = {
        current: {
            total: '₹7,397',
            data: [4200, 3800, 5100, 4800, 6200, 7397]
        },
        last: {
            total: '₹6,150',
            data: [3500, 4100, 4500, 5200, 4900, 6150]
        },
        prev: {
            total: '₹5,820',
            data: [3900, 3600, 4200, 4800, 5100, 5820]
        }
    };

    // Active loading wave animation
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                data: mockData.current.data,
                borderColor: '#6366f1', // Indigo line curve
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4, // elastic curvature
                pointRadius: 0, // hide individual anchors
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                x: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                },
                y: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: { display: false },
                    border: { display: false }
                },
                y: {
                    display: false,
                    grid: { display: false },
                    border: { display: false },
                    min: 3000
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 0
                }
            }
        }
    });

    // Handle Month Selection
    const monthSelector = document.getElementById('monthSelector');
    const spendingAmount = document.getElementById('spendingAmount');

    if (monthSelector && spendingAmount) {
        // Dynamically set real month names
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        const currentMonthIdx = d.getMonth();
        
        monthSelector.options[0].text = monthNames[currentMonthIdx];
        monthSelector.options[1].text = monthNames[(currentMonthIdx - 1 + 12) % 12];
        monthSelector.options[2].text = monthNames[(currentMonthIdx - 2 + 12) % 12];

        monthSelector.addEventListener('change', (e) => {
            const selectedMonth = e.target.value;
            const newData = mockData[selectedMonth];
            
            // Sync text with fade effect
            spendingAmount.style.opacity = 0;
            setTimeout(() => {
                spendingAmount.innerText = newData.total;
                spendingAmount.style.opacity = 1;
            }, 150);

            // Update Chart
            chart.data.datasets[0].data = newData.data;
            chart.update();
        });
    }

    // Modal Logic
    const overlay = document.getElementById('auth-modals-overlay');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    
    const loginBtns = [document.getElementById('login-btn-nav'), document.getElementById('login-btn-hero')];
    const signupBtns = [document.getElementById('signup-btn-nav'), document.getElementById('signup-btn-hero')];
    const closeBtns = document.querySelectorAll('.close-modal');

    const openModal = (modalElement) => {
        if (!overlay || !modalElement) return;
        overlay.classList.remove('hidden');
        modalElement.classList.remove('hidden');
        // small delay for transition
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            modalElement.classList.remove('scale-95');
        }, 10);
    };

    const closeModal = () => {
        if (!overlay) return;
        overlay.classList.add('opacity-0');
        if (loginModal) loginModal.classList.add('scale-95');
        if (signupModal) signupModal.classList.add('scale-95');
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            if (loginModal) loginModal.classList.add('hidden');
            if (signupModal) signupModal.classList.add('hidden');
        }, 300); // match transition duration
    };

    loginBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => openModal(loginModal));
    });

    signupBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => openModal(signupModal));
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on click outside
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
});
