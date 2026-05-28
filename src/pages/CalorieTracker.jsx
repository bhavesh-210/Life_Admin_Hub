import { useState, useRef } from 'react';
import { useLifeAdmin } from '../context/LifeAdminContext';

export default function CalorieTracker() {
    const { settings } = useLifeAdmin();
    const [meals, setMeals] = useState([
        { id: '1', name: 'Oatmeal & Berries', type: 'Breakfast', calories: 350, time: '08:30 AM', image: null },
        { id: '2', name: 'Chicken Salad', type: 'Lunch', calories: 450, time: '01:15 PM', image: null },
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Scanner State
    const [scanState, setScanState] = useState('idle'); // idle, scanning, success
    const [scannedImage, setScannedImage] = useState(null);
    const [autoFillData, setAutoFillData] = useState({ name: '', calories: '' });
    const fileInputRef = useRef(null);

    const calorieGoal = 2000;
    const totalConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const remaining = Math.max(0, calorieGoal - totalConsumed);
    const progressPercentage = Math.min(100, Math.round((totalConsumed / calorieGoal) * 100));

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setScannedImage(imageUrl);
            setScanState('scanning');
            
            // Simulate AI scan
            setTimeout(() => {
                const simulatedMeals = [
                    { name: 'Grilled Salmon Bowl', calories: 650 },
                    { name: 'Avocado Toast', calories: 320 },
                    { name: 'Green Smoothie', calories: 210 },
                    { name: 'Cheeseburger', calories: 850 }
                ];
                const randomMatch = simulatedMeals[Math.floor(Math.random() * simulatedMeals.length)];
                setAutoFillData(randomMatch);
                setScanState('success');
            }, 2000);
        }
    };

    const handleAddMeal = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newMeal = {
            id: Date.now().toString(),
            name: formData.get('name'),
            type: formData.get('type'),
            calories: parseInt(formData.get('calories')) || 0,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            image: scannedImage
        };
        setMeals([newMeal, ...meals]);
        
        // Reset modal state
        closeModal();
    };

    const handleDeleteMeal = (id) => {
        setMeals(meals.filter(meal => meal.id !== id));
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setScannedImage(null);
        setScanState('idle');
        setAutoFillData({ name: '', calories: '' });
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Calorie Tracker</h1>
                    <p className="page-subtitle">// LOG MACROS AND DAILY ENERGY INTAKE</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="btn flex items-center gap-2"
                    >
                        <svg className="w-4 h-4 text-customAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Scan Meal
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="btn btn-dark"
                    >
                        Log Meal
                    </button>
                </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Daily Goal</h3>
                    <p className="text-3xl font-black font-mono text-slate-800 dark:text-slate-100">{calorieGoal} <span className="text-sm font-bold opacity-60">kcal</span></p>
                </div>
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Consumed</h3>
                    <p className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-450">{totalConsumed} <span className="text-sm font-bold opacity-60 text-slate-500">kcal</span></p>
                </div>
                <div className="card shadow-[3px_3px_0_0_rgba(15,23,42,0.05)]">
                    <h3 className="text-xs font-mono font-bold uppercase opacity-60 mb-2">// Remaining</h3>
                    <p className="text-3xl font-black font-mono text-rose-600 dark:text-rose-450">{remaining} <span className="text-sm font-bold opacity-60 text-slate-500">kcal</span></p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                <div className="flex justify-between items-end mb-2">
                    <h3 className="font-extrabold uppercase tracking-tight text-sm">// Intake Progress</h3>
                    <span className="text-xs font-mono font-bold">{progressPercentage}%</span>
                </div>
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div 
                        className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Meals List */}
            <div className="card shadow-[4px_4px_0_0_rgba(15,23,42,0.05)]">
                <h3 className="font-extrabold uppercase tracking-tight text-lg mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">// Today's Logs</h3>
                
                {meals.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-slate-50 dark:bg-slate-900/50 border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 rounded mb-4">
                        <svg className="w-12 h-12 mx-auto mb-3 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        <h3 className="font-extrabold uppercase tracking-tight text-md mb-1">No Meals Logged</h3>
                        <p className="text-xs font-mono text-slate-500 mb-4 max-w-sm mx-auto">Start logging your meals to track your daily calorie intake.</p>
                        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-dark text-xs">Log First Meal</button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {meals.map((meal) => (
                            <div key={meal.id} className="flex justify-between items-center p-4 border-[1.5px] border-slate-900/10 dark:border-slate-100/10 rounded bg-white dark:bg-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    {meal.image ? (
                                        <div className="w-12 h-12 rounded border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0">
                                            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-extrabold uppercase text-sm">{meal.name}</h4>
                                        <div className="flex gap-3 mt-1">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">{meal.type}</span>
                                            <span className="text-[10px] font-mono text-slate-400">•</span>
                                            <span className="text-[10px] font-mono text-slate-500">{meal.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <div>
                                        <span className="font-black font-mono text-lg">{meal.calories}</span>
                                        <span className="text-[10px] font-mono font-bold ml-1 opacity-60">kcal</span>
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteMeal(meal.id)}
                                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 p-1.5 rounded transition-colors"
                                        title="Remove log"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Log Meal Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget && scanState !== 'scanning') closeModal()}}>
                    <div className="auth-card relative animate-popIn w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <button onClick={closeModal} disabled={scanState === 'scanning'} className={`absolute top-6 right-6 transition-colors ${scanState === 'scanning' ? 'text-slate-200 dark:text-slate-800 cursor-not-allowed' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">// Log Meal</h2>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">Append new calorie entry to register.</p>
                        
                        {/* Image Upload Area */}
                        <div className="mb-6">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={handleImageUpload}
                                disabled={scanState === 'scanning'}
                            />
                            
                            {!scannedImage ? (
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50 dark:bg-slate-900/50 transition-colors"
                                >
                                    <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <p className="font-bold text-sm uppercase">Upload Food Photo</p>
                                    <p className="text-xs font-mono text-slate-500 mt-1">AI will estimate calories automatically</p>
                                </div>
                            ) : (
                                <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 h-48 flex items-center justify-center">
                                    <img src={scannedImage} alt="Uploaded food" className={`w-full h-full object-cover transition-opacity duration-300 ${scanState === 'scanning' ? 'opacity-50 blur-sm' : 'opacity-100'}`} />
                                    
                                    {scanState === 'scanning' && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                                            <p className="font-bold uppercase tracking-widest text-xs">Scanning Image...</p>
                                        </div>
                                    )}
                                    
                                    {scanState === 'success' && (
                                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-lg flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            Scan Complete
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleAddMeal} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Meal Name</label>
                                <input 
                                    name="name" 
                                    type="text" 
                                    className="input" 
                                    placeholder="e.g. Avocado Toast" 
                                    defaultValue={autoFillData.name}
                                    key={`name-${autoFillData.name}`}
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Type</label>
                                    <select name="type" className="input font-bold uppercase tracking-wide">
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Snack">Snack</option>
                                        <option value="Drink">Drink</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1">Calories</label>
                                    <input 
                                        name="calories" 
                                        type="number" 
                                        className="input" 
                                        placeholder="350" 
                                        defaultValue={autoFillData.calories}
                                        key={`cal-${autoFillData.calories}`}
                                        required 
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={scanState === 'scanning'} className={`w-full mt-2 transition-all ${scanState === 'scanning' ? 'bg-slate-300 text-slate-500 cursor-not-allowed py-3 px-4 rounded font-extrabold uppercase tracking-widest text-xs' : 'btn btn-dark'}`}>
                                Save Entry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
