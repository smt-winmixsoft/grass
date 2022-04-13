import { formatStringValue, formatNumberValue } from 'app/utils/common';

export class Material {
    materialId: number = 0;
    name: string = "";
    materialAnalyses: MaterialAnalysis[] = []

    initFromMaterial(item: Material): void {
        this.materialId = item.materialId;
        this.name = item.name;
        item.materialAnalyses.forEach(el=>{
            el.value = formatNumberValue(el.value);
            this.materialAnalyses.push(el);
        });
    }

    initFromAnalyses(items: AnalysisType[]): void {
        items.forEach(item => {
            this.materialAnalyses.push({
                analysisTypeId: item.analysisTypeId,
                analysisType: {
                    analysisTypeId: item.analysisTypeId,
                    name: item.name
                }
            } as MaterialAnalysis);
        });
    }

    getForSave(): Material {
        var material: Material = {
            materialId: this.materialId,
            name: this.name,
            materialAnalyses: []
        } as Material;

        this.materialAnalyses.forEach(item => {
            var val = formatStringValue(item.value);
            if (val != null) {
                material.materialAnalyses.push({
                    materialId: material.materialId,
                    analysisTypeId: item.analysisTypeId,
                    value: val
                } as MaterialAnalysis);
            }
        });
        return material;
    }
}

export class AnalysisType {
    analysisTypeId: number = 0;
    name: string = "";
}

export class MaterialAnalysis {
    materialId: number = 0;
    analysisTypeId: number = 0;
    value: any = null;
    analysisType: AnalysisType = null;
}
