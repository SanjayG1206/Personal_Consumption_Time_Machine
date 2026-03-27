import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dataAPI, dashboardAPI, goalsAPI } from "../services/api";

export interface DataEntry {
  id: number;
  date: string;
  category: "travel" | "energy" | "water" | "waste";
  activity: string;
  quantity: number;
  unit: string;
  emission_factor: number;
  emission_value: number;
}

export interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

interface SustainabilityContextType {
  sustainabilityScore: number;
  dataEntries: DataEntry[];
  goals: Goal[];
  isLoading: boolean;
  addDataEntry: (entry: {
    category: string;
    activity: string;
    quantity: number;
    unit: string;
    date?: string;
  }) => Promise<void>;
  addGoal: (goal: {
    title: string;
    target: number;
    unit: string;
    deadline: string;
  }) => Promise<void>;
  updateGoal: (id: number, current: number) => Promise<void>;
  deleteGoal: (id: number) => Promise<void>;
  refreshData: () => Promise<void>;
  categoryBreakdown: Record<string, number>;
  totalEmissions: number;
}

const SustainabilityContext = createContext<SustainabilityContextType | undefined>(undefined);

export const useSustainability = () => {
  const context = useContext(SustainabilityContext);
  if (!context) {
    throw new Error("useSustainability must be used within SustainabilityProvider");
  }
  return context;
};

export const SustainabilityProvider = ({ children }: { children: ReactNode }) => {
  const [sustainabilityScore, setSustainabilityScore] = useState(0);
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryBreakdown, setCategoryBreakdown] = useState<Record<string, number>>({});
  const [totalEmissions, setTotalEmissions] = useState(0);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [dashboardData, goalsData, consumptionData] = await Promise.all([
        dashboardAPI.getDashboard(),
        goalsAPI.getGoals(),
        dataAPI.getData(30),
      ]);

      setSustainabilityScore(dashboardData.sustainability_score);
      setCategoryBreakdown(dashboardData.category_breakdown);
      setTotalEmissions(dashboardData.total_emissions);
      setDataEntries(consumptionData);
      setGoals(goalsData);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addDataEntry = async (entry: {
    category: string;
    activity: string;
    quantity: number;
    unit: string;
    date?: string;
  }) => {
    try {
      await dataAPI.addData(entry);
      await refreshData();
    } catch (error) {
      console.error("Failed to add data entry:", error);
      throw error;
    }
  };

  const addGoal = async (goal: {
    title: string;
    target: number;
    unit: string;
    deadline: string;
  }) => {
    try {
      await goalsAPI.createGoal(goal);
      await refreshData();
    } catch (error) {
      console.error("Failed to add goal:", error);
      throw error;
    }
  };

  const updateGoal = async (id: number, current: number) => {
    try {
      await goalsAPI.updateGoal(id, current);
      await refreshData();
    } catch (error) {
      console.error("Failed to update goal:", error);
      throw error;
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      await goalsAPI.deleteGoal(id);
      await refreshData();
    } catch (error) {
      console.error("Failed to delete goal:", error);
      throw error;
    }
  };

  return (
    <SustainabilityContext.Provider
      value={{
        sustainabilityScore,
        dataEntries,
        goals,
        isLoading,
        addDataEntry,
        addGoal,
        updateGoal,
        deleteGoal,
        refreshData,
        categoryBreakdown,
        totalEmissions,
      }}
    >
      {children}
    </SustainabilityContext.Provider>
  );
};