import StarterBorder from "components/MainLayout/ReputationBorders/StarterBorder";
import BronzeBorder from "components/MainLayout/ReputationBorders/BronzeBorder";
import SilverBorder from "components/MainLayout/ReputationBorders/SilverBorder";
import GoldBorder from "components/MainLayout/ReputationBorders/GoldBorder";
import PlatinumBorder from "components/MainLayout/ReputationBorders/PlatinumBorder";
import DiamondBorder from "components/MainLayout/ReputationBorders/DiamondBorder";

export const REPUTATION_BORDERS = {
	0: StarterBorder,
	250: BronzeBorder,
	750: SilverBorder,
	1500: GoldBorder,
	3000: PlatinumBorder,
	5000: DiamondBorder,
};